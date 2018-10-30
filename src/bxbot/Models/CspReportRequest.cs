using Newtonsoft.Json;

namespace bxbot
{
    public class CspReportRequest
    {
        [JsonProperty(PropertyName = "csp-report")]
        public CspReport CspReport { get; set; }
    }
}