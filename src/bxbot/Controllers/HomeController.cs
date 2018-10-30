namespace bxbot.Controllers
{
    using System;
    using System.Diagnostics;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        [HttpPost]
        public ActionResult<string> CspReport([FromBody] CspReportRequest request)
        {
            Console.WriteLine($"Blocked URL -------------------> {request.CspReport.BlockedUri}");
            return string.Empty;
        }
    }
}
