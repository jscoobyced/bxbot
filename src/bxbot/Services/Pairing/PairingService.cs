namespace bxbot.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using Newtonsoft.Json;
    using System.Linq;
    using System;
    using System.Diagnostics;

    public class PairingService : IPairingService
    {
        private readonly IRestConnector restConnector;
        private readonly IOptions<AppSettings> options;

        public PairingService(IRestConnector restConnector, IOptions<AppSettings> options)
        {
            this.restConnector = restConnector;
            this.options = options;
        }

        public async Task<IEnumerable<SelectOption>> GetCurrenciesAsync()
        {
            var selectOptions = new List<SelectOption>();

            if (string.IsNullOrEmpty(this.options?.Value?.Url?.Currencies))
            {
                return selectOptions;
            }

            var result = await this.restConnector.GetAsync(this.options.Value.Url.Currencies);
            if (string.IsNullOrWhiteSpace(result))
            {
                return selectOptions;
            }

            var resultDictionary = JsonConvert.DeserializeObject<Dictionary<int, PairingResult>>(result);

            if (resultDictionary == null)
            {
                return selectOptions;
            }

            foreach (var item in resultDictionary)
            {
                if (item.Value?.active?.ToLowerInvariant() != "true")
                {
                    continue;
                }

                var selectOption = new SelectOption()
                {
                    Text = $"{item.Value.primary_currency}/{item.Value.secondary_currency}",
                    Value = int.Parse(item.Value.pairing_id)
                };

                selectOptions.Add(selectOption);
            }

            return selectOptions;
        }

        public async Task<IEnumerable<Pairing>> GetPairingAsync(int id, int interval)
        {
            var pairings = new List<Pairing>();
            if (string.IsNullOrEmpty(this.options?.Value?.Url?.Pairings))
            {
                return pairings;
            }

            var url = string.Format(this.options.Value.Url.Pairings, id, interval, DateTime.Now.Millisecond);
            var result = await this.restConnector.GetAsync(url);
            if (string.IsNullOrWhiteSpace(result))
            {
                return pairings;
            }

            if (result.Contains("["))
                result = result.Substring(result.IndexOf("["));
            if (result.Contains("]"))
                result = result.Substring(0, result.LastIndexOf("]") + 1);
            result = result.Replace("\n", "");
            var resultArray = JsonConvert.DeserializeObject<string[][]>(result);
            if (resultArray != null)
            {
                resultArray.ToList().ForEach(
                    value =>
                    {
                        if (value.Length != 7)
                        {
                            return;
                        }

                        var pairing = new Pairing()
                        {
                            Timestamp = long.Parse(value[0]) - 7 * 60 * 60 * 1000,
                            Low = double.Parse(value[1]),
                            High = double.Parse(value[2]),
                            Current = double.Parse(value[3]),
                            Volume = double.Parse(value[4]),
                            Open = double.Parse(value[5]),
                            Close = double.Parse(value[6])
                        };
                        pairings.Add(pairing);
                    }
                );
            }

            return pairings;
        }
    }
}