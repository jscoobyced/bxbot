namespace bxbot.tests
{
    using Xunit;
    using Microsoft.Extensions.DependencyInjection;
    using Moq;
    using System;

    public class DependencyInjectionTests
    {

        [Fact]
        public void Inject()
        {
            var serviceCollectionMock = new Mock<IServiceCollection>() { DefaultValue = DefaultValue.Mock};
            DependencyInjection.Inject(serviceCollectionMock.Object);
            
            // This assertion should be reached if injection was successfull
            Assert.True(true);
        }
    }
}