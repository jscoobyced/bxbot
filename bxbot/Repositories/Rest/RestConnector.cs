namespace bxbot
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Runtime.Serialization.Json;
    using System.Threading.Tasks;

    public class RestConnector : IRestConnector
    {
        public async Task<string> GetAsync(string url, IDictionary<string, object> parameters)
        {
            if (string.IsNullOrWhiteSpace(url))
            {
                return null;
            }

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36");
                return await client.GetStringAsync(url);
            }
        }
    }
}