namespace bxbot.tests
{
    using bxbot.Controllers;
    using bxbot.Services;
    public class DataControllerBuilder
    {
        private IPairingService pairingService;

        public DataControllerBuilder WithPairingService(IPairingService pairingService)
        {
            this.pairingService = pairingService;
            return this;
        }

        public DataController Build()
        {
            return new DataController(this.pairingService);
        }
    }
}