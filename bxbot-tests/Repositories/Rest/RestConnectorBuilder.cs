namespace bxbot.tests
{
    using System.Collections.Generic;
    using bxbot.Services;
    using Moq;

    public class RestConnectorBuilder
    {
        private string result;

        public RestConnectorBuilder WithResult(string result)
        {
            this.result = result;
            return this;
        }

        public IRestConnector Build()
        {
            var mockRestConnector = new Mock<IRestConnector>();
            mockRestConnector
                .Setup(m=>m.GetAsync(It.IsAny<string>(), It.IsAny<IDictionary<string, object>>()))
                .ReturnsAsync(this.result);

            return mockRestConnector.Object;
        }
    }
}