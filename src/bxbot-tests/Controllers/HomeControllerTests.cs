namespace bxbot.tests
{
    using Xunit;
    using bxbot.Controllers;
    using FluentAssertions;
    using Microsoft.AspNetCore.Mvc;

    public class HomeControllerTests
    {
        [Fact]
        public void Index()
        {
            var homeController = new HomeControllerBuilder()
            .Build();

            var actionResult = homeController.Index();

            actionResult.Should().NotBeNull("because the default response from HomeController is a valid result.");
            actionResult.Should().BeAssignableTo<IActionResult>("because the default response from HomeController is a valid IActionResult.");
            actionResult.Should().BeAssignableTo<ViewResult>("because the default response from HomeController is a valid ViewResult.");

            var viewResult = (ViewResult)actionResult;

            viewResult.Model.Should().BeNull("because the default ViewResult from HomeController doesn't contains model.");
            viewResult.ViewName.Should().BeNull("because the default view name from the HomeController is not set.");
        }

        [Fact]
        public void Error()
        {
            var homeController = new HomeControllerBuilder()
            .Build();

            var actionResult = homeController.Error();

            actionResult.Should().NotBeNull("because the default response from HomeController is a valid result.");
            actionResult.Should().BeAssignableTo<IActionResult>("because the default response from HomeController is a valid IActionResult.");
            actionResult.Should().BeAssignableTo<ViewResult>("because the default response from HomeController is a valid ViewResult.");

            var viewResult = (ViewResult)actionResult;

            viewResult.Model.Should().BeNull("because the default ViewResult from HomeController doesn't contains model.");
            viewResult.ViewName.Should().BeNull("because the default view name from the HomeController is not set.");
            viewResult.ViewData.Should().NotBeNull("because there data have been set.");
        }

        [Fact]
        public void CspReport()
        {
            var homeController = new HomeControllerBuilder()
                .Build();
            var cspReportRequest = new CspReportRequest()
            {
                CspReport = new CspReport()
                {
                    BlockedUri = "/CspReport",
                    DocumentUri = "self",
                    OriginalPolicy = "self",
                    EffectiveDirective = "self",
                    Referrer = "self",
                    ViolatedDirective = "script-src",
                    StatusCode = 200
                }
            };

            var actionResult = homeController.CspReport(cspReportRequest);

            actionResult.Should().NotBeNull("because the default response from HomeController is a valid result.");
            actionResult.Should().BeAssignableTo<ActionResult<string>>("because the default response from HomeController is a valid IActionResult.");

            var viewResult = (ActionResult<string>)actionResult;

            viewResult.Value.Should().NotBeNull("because the controller returns empty string.");
            viewResult.Value.Should().BeEmpty("because the controller returns empty string.");
        }
    }
}