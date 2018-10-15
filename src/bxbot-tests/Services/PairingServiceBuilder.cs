namespace bxbot.tests
{
    using System.Collections.Generic;
    using bxbot.Services;
    using Moq;

    public class PairingServiceBuilder
    {
        private IEnumerable<Pairing> pairings;
        private IEnumerable<SelectOption> selectOptions;

        public PairingServiceBuilder WithNoPairings()
        {
            this.WithPairings(new List<Pairing>());
            return this;
        }

        public PairingServiceBuilder WithNoSelectOptions()
        {
            this.WithSelectOptions(new List<SelectOption>());
            return this;
        }

        public PairingServiceBuilder WithNullPairings()
        {
            this.WithPairings(null);
            return this;
        }

        public PairingServiceBuilder WithNullSelectOptions()
        {
            this.WithSelectOptions(null);
            return this;
        }

        public PairingServiceBuilder WithPairings(IEnumerable<Pairing> pairings)
        {
            this.pairings = pairings;
            return this;
        }

        public PairingServiceBuilder WithSelectOptions(IEnumerable<SelectOption> selectOptions)
        {
            this.selectOptions = selectOptions;
            return this;
        }

        public IPairingService Build()
        {
            var mockPairingService = new Mock<IPairingService>();
            mockPairingService.Setup(pairingService => pairingService.GetPairingAsync(It.IsAny<int>(), It.IsAny<int>()))
            .ReturnsAsync(this.pairings);
            mockPairingService.Setup(pairingService => pairingService.GetCurrenciesAsync())
            .ReturnsAsync(this.selectOptions);
            return mockPairingService.Object;
        }
    }
}