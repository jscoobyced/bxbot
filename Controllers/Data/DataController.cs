namespace bxbot
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
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
            return await this.pairingService.GetPairingAsync(id, interval);
        }
    }
}