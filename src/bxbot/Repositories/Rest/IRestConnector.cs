namespace bxbot
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IRestConnector
    {
        Task<string> GetAsync(string url);
    }
}