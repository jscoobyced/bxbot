namespace bxbot.tests
{
    using Xunit;
    using FluentAssertions;
    using bxbot.Controllers;
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;

    public class DataControllerCurrencyTests
    {
        private const string ResultEmptyList = "because the default result should be an empty list.";

        [Fact]
        public void WithNullPairingService()
        {
            var dataController = new DataControllerBuilder()
                .WithPairingService(null)
                .Build();

            IEnumerable<SelectOption> result = null;
            Func<Task> pairing = async () => result = await dataController.Currencies();
            pairing.Should().NotThrow<NullReferenceException>("because it should return default empty currencies.");

            result.Should().NotBeNull(ResultEmptyList)
                .And.BeEmpty(ResultEmptyList);
        }

        [Fact]
        public async Task WithPairingServiceNullSelectOptions()
        {
            var dataController = new DataControllerBuilder()
                .WithPairingService(new PairingServiceBuilder().WithNullSelectOptions().Build())
                .Build();

            var result = await dataController.Currencies();

            result.Should().BeNull();
        }

        [Fact]
        public async Task WithPairingServiceNoSelectOptions()
        {
            var dataController = new DataControllerBuilder()
                .WithPairingService(new PairingServiceBuilder().WithNoSelectOptions().Build())
                .Build();

            var result = await dataController.Currencies();

            result.Should().NotBeNull(ResultEmptyList);
        }

        [Fact]
        public async Task WithPairingServiceSelectOptions()
        {
            var selectOptions = new List<SelectOption>();
            selectOptions.Add(new SelectOption());

            var dataController = new DataControllerBuilder()
                .WithPairingService(new PairingServiceBuilder()
                .WithSelectOptions(selectOptions)
                .Build())
                .Build();

            var result = await dataController.Currencies();

            result.Should().NotBeNull(ResultEmptyList);
            result.Should().BeEquivalentTo(selectOptions, "because the PairingService returns the injected data.");
        }
    }
}