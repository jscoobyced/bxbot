namespace bxbot.tests
{
    using System.Collections.Generic;
    using bxbot.Services;
    using FluentAssertions;
    using Moq;
    using Xunit;

    public class PairingServiceTests
    {

        [Theory]
        [InlineData(null, 0)]
        [InlineData("null", 0)]
        [InlineData("", 0)]
        [InlineData("[]", 0)]
        [InlineData("[[1,2.0,2.0,2.0,2.0,2.0]]", 0)]
        [InlineData("[[1,2.0,2.0,2.0,2.0,2.0,2.0]]", 1)]
        [InlineData("[[1,2.0,2.0,2.0,2.0,2.0,2.0],[1,2.0,2.0,2.0,2.0,2.0,2.0]]", 2)]
        public async void GetPairingAsync(string result, int length)
        {
            var restConnector = new RestConnectorBuilder()
                                    .WithResult(result)
                                    .Build();

            var pairingService = new PairingService(restConnector);

            var pairings = await pairingService.GetPairingAsync(1, 1);

            pairings.Should().BeAssignableTo<List<Pairing>>("the method always returns a list of pairings.");
            var pairingList = (List<Pairing>)pairings;
            pairingList.Count.Should().Be(length, "the data returned is such.");

        }

    }
}