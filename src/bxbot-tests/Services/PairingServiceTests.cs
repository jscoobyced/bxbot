namespace bxbot.tests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
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
        public async Task GetPairingAsync(string result, int length)
        {
            var restConnector = new RestConnectorBuilder()
                                    .WithResult(result)
                                    .Build();

            var ioptions = new OptionBuilder()
                                .WithDefaultPairingsUrl()
                                .Build();

            var pairingService = new PairingService(restConnector, ioptions);

            var pairings = await pairingService.GetPairingAsync(1, 1);

            pairings.Should().BeAssignableTo<List<Pairing>>("the method always returns a list of pairings.");
            var pairingList = (List<Pairing>)pairings;
            pairingList.Count.Should().Be(length, "the data returned is such.");
        }


        [Theory]
        [InlineData(null, 0)]
        [InlineData("null", 0)]
        [InlineData("", 0)]
        [InlineData("{}", 0)]
        [InlineData("{\"1\":{\"pairing_id\":\"1\",\"primary_currency\":\"THB\",\"secondary_currency\":\"BTC\","
            + "\"primary_min\":\"10.00000000\",\"secondary_min\":\"0.00050000\",\"active\":true}}", 1)]
        [InlineData("{\"1\":{\"pairing_id\":\"1\",\"primary_currency\":\"THB\",\"secondary_currency\":\"BTC\","
            + "\"primary_min\":\"10.00000000\",\"secondary_min\":\"0.00050000\",\"active\":true},\"2\":{\"pairing_id\":"
            + "\"2\",\"primary_currency\":\"THB\",\"secondary_currency\":\"BTC\",\"primary_min\":\"10.00000000\","
            + "\"secondary_min\":\"0.00050000\",\"active\":true}}", 2)]
        public async Task GetCurrencies(string result, int length)
        {
            var restConnector = new RestConnectorBuilder()
                                    .WithResult(result)
                                    .Build();
            var ioptions = new OptionBuilder()
                                .WithDefaultCurrenciesUrl()
                                .Build();

            var pairingService = new PairingService(restConnector, ioptions);

            var selectOptions = await pairingService.GetCurrenciesAsync();

            selectOptions.Should().BeAssignableTo<List<SelectOption>>("the method always returns a list of pairings.");
            var selectOptionList = (List<SelectOption>)selectOptions;
            selectOptionList.Count.Should().Be(length, "the data returned is such.");
        }

        [Fact]
        public async Task PairingServiceWithNullAppSettings()
        {
            var restConnector = new RestConnectorBuilder()
                                    .WithResult(string.Empty)
                                    .Build();
            var ioptions = new OptionBuilder()
                                .BuildNullAppSettings();

            var pairingService = new PairingService(restConnector, ioptions);

            var selectOptions = await pairingService.GetCurrenciesAsync();
            selectOptions.Should().BeEmpty("the result should be empty if there is no configuration available.");
            var pairings = await pairingService.GetPairingAsync(1, 1);
            pairings.Should().BeEmpty("the result should be empty if there is no configuration available.");
        }

        [Fact]
        public async Task PairingServiceWithNullUrl()
        {
            var restConnector = new RestConnectorBuilder()
                                    .WithResult(string.Empty)
                                    .Build();
            var ioptions = new OptionBuilder()
                                .BuildNullUrlAppSettings();

            var pairingService = new PairingService(restConnector, ioptions);

            var selectOptions = await pairingService.GetCurrenciesAsync();
            selectOptions.Should().BeEmpty("the result should be empty if there is no configuration available.");
            var pairings = await pairingService.GetPairingAsync(1, 1);
            pairings.Should().BeEmpty("the result should be empty if there is no configuration available.");
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public async Task PairingServiceWithNullUrls(string url)
        {
            var restConnector = new RestConnectorBuilder()
                                    .WithResult(string.Empty)
                                    .Build();
            var ioptions = new OptionBuilder()
                                .WithCurrenciesUrl(url)
                                .WithPairingsUrl(url)
                                .Build();

            var pairingService = new PairingService(restConnector, ioptions);

            var selectOptions = await pairingService.GetCurrenciesAsync();
            selectOptions.Should().BeEmpty("the result should be empty if the URL is null or empty.");
            var pairings = await pairingService.GetPairingAsync(1, 1);
            pairings.Should().BeEmpty("the result should be empty if there is no configuration available.");
        }
    }
}