namespace bxbot.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using bxbot.Services;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private readonly IPairingService pairingService;

        public DataController(IPairingService pairingService)
        {
            this.pairingService = pairingService;
        }

        [HttpGet("pairing/{id}/{interval}")]
        public async Task<IEnumerable<Pairing>> Pairing(int id, int interval)
        {
            if (this.pairingService == null)
            {
                return await Task.Run(() =>
                {
                    return new List<Pairing>();
                });
            }

            return await this.pairingService.GetPairingAsync(id, interval);
        }

        [HttpGet("currencies")]
        public async Task<IEnumerable<SelectOption>> Currencies()
        {
            if (this.pairingService == null)
            {
                return await Task.Run(() =>
                {
                    return new List<SelectOption>();
                });
            }

            return await this.pairingService.GetCurrenciesAsync();
        }
    }
}