namespace bxbot.tests
{
    using System;
    using FluentAssertions;
    using Xunit;

    public class RestConnectorTests
    {
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public async void GetAsyncBlankUrlTests(string url)
        {
            var restConnector = new RestConnector();
            var result = await restConnector.GetAsync(url);

            result.Should().BeNull($"because \"{url}\" is not a URL");
        }

        [Fact]
        public void GetAsyncInvalidUrlTest()
        {
            var restConnector = new RestConnector();
            Assert.ThrowsAnyAsync<Exception>( () => restConnector.GetAsync("---"));
        }
    }
}