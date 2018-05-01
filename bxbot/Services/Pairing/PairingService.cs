namespace bxbot.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Newtonsoft.Json;
    using System.Linq;
    using System;

    public class PairingService : IPairingService
    {
        private readonly IRestConnector restConnector;

        public PairingService(IRestConnector restConnector)
        {
            this.restConnector = restConnector;
        }
        public async Task<IEnumerable<Pairing>> GetPairingAsync(int id, int interval)
        {
            var pairings = new List<Pairing>();
            var url = string.Format("https://bx.in.th/api/chart/price/?pairing={0}&int={1}&limit=1&callback=display&_={2}", id, interval, DateTime.Now.Millisecond);
            var result = await this.restConnector.GetAsync(url, null);
            if (string.IsNullOrWhiteSpace(result))
            {
                return pairings;
            }

            result = result.Substring(result.IndexOf("["));
            result = result.Substring(0, result.LastIndexOf("]") + 1);
            result = result.Replace("\n", "");
            var resultArray = JsonConvert.DeserializeObject<string[][]>(result);
            if (resultArray != null)
            {
                resultArray.ToList().ForEach(
                    value =>
                    {
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