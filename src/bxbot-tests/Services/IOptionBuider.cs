namespace bxbot.tests
{

    using Microsoft.Extensions.Options;
    using Moq;

    public class IOptionBuilder
    {
        private AppSettings appSettings = new AppSettings() { Url = new Url() };

        public IOptions<AppSettings> Build()
        {
            var ioptions = new Mock<IOptions<AppSettings>>();
            ioptions.Setup(o => o.Value).Returns(this.appSettings);
            return ioptions.Object;
        }

        public IOptions<AppSettings> BuildNullAppSettings()
        {
            var ioptions = new Mock<IOptions<AppSettings>>();
            ioptions.Setup(o => o.Value).Returns((AppSettings)null);
            return ioptions.Object;
        }

        public IOptions<AppSettings> BuildNullUrlAppSettings()
        {
            var nullUrlAppSettings = new AppSettings()
            {
                Url = null
            };
            var ioptions = new Mock<IOptions<AppSettings>>();
            ioptions.Setup(o => o.Value).Returns(nullUrlAppSettings);
            return ioptions.Object;
        }

        public IOptionBuilder WithDefaultCurrenciesUrl()
        {
            this.WithCurrenciesUrl("some");
            return this;
        }

        public IOptionBuilder WithCurrenciesUrl(string url)
        {
            this.appSettings.Url.Currencies = url;
            return this;
        }

        public IOptionBuilder WithDefaultPairingsUrl()
        {
            this.WithPairingsUrl("some");
            return this;
        }

        public IOptionBuilder WithPairingsUrl(string url)
        {
            this.appSettings.Url.Pairings = url;
            return this;
        }
    }
}