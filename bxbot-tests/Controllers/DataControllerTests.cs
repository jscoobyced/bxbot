namespace bxbot.tests
{
    using Xunit;
    using FluentAssertions;
    using bxbot.Controllers;
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;

    public class DataControllerTests
    {
        private const string ResultEmptyList = "because the default result should be an empty list.";

        [Fact]
        public void WithNullPairingService()
        {
            var dataController = new DataControllerBuilder()
            .WithPairingService(null)
            .Build();

            IEnumerable<Pairing> result = null;
            Func<Task> pairing = async () => result = await dataController.Pairing(1, 1);
            pairing.Should().NotThrow<NullReferenceException>("because it should return default empty Pairing data.");

            result.Should().NotBeNull(ResultEmptyList)
            .And.BeEmpty(ResultEmptyList);
        }

        [Fact]
        public async void WithPairingServiceNullPairings()
        {
            var dataController = new DataControllerBuilder()
            .WithPairingService(new PairingServiceBuilder().WithNullPairings().Build())
            .Build();

            var result = await dataController.Pairing(1, 1);

            result.Should().BeNull();
        }
        [Fact]
        public async void WithPairingServiceNoPairings()
        {
            var dataController = new DataControllerBuilder()
            .WithPairingService(new PairingServiceBuilder().WithNoPairings().Build())
            .Build();

            var result = await dataController.Pairing(1, 1);

            result.Should().NotBeNull(ResultEmptyList);
        }
        [Fact]
        public async void WithPairingServicePairings()
        {
            var pairings = new List<Pairing>();
            pairings.Add(new Pairing());

            var dataController = new DataControllerBuilder()
            .WithPairingService(new PairingServiceBuilder()
            .WithPairings(pairings)
            .Build())
            .Build();

            var result = await dataController.Pairing(1, 1);

            result.Should().NotBeNull(ResultEmptyList);
            result.Should().BeEquivalentTo(pairings, "because the PairingService returns the injected data.");
        }
    }
}