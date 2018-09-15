namespace bxbot.tests
{
    using System.Collections.Generic;
    using bxbot.Services;
    using Moq;

    public class PairingServiceBuilder
    {
        private IEnumerable<Pairing> pairings;

        public PairingServiceBuilder WithNoPairings()
        {
            this.WithPairings(new List<Pairing>());
            return this;
        }

        public PairingServiceBuilder WithNullPairings()
        {
            this.WithPairings(null);
            return this;
        }

        public PairingServiceBuilder WithPairings(IEnumerable<Pairing> pairings)
        {
            this.pairings = pairings;
            return this;
        }

        public IPairingService Build()
        {
            var mockPairingService = new Mock<IPairingService>();
            mockPairingService.Setup(pairingService => pairingService.GetPairingAsync(It.IsAny<int>(), It.IsAny<int>()))
            .ReturnsAsync(this.pairings);
            return mockPairingService.Object;
        }
    }
}