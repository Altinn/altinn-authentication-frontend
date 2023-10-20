namespace Altinn.Authentication.UI.Core.Common;

public static class HttpClientExtensions
{

    /// <summary>
    /// Extensionmethod to add Authorization token and access token to the header
    /// </summary>
    /// <param name="httpClient"></param>
    /// <param name="authorizationToken"></param>
    /// <param name="requestURI"></param>
    /// <param name="content"></param>
    /// <param name="platformAccessToken"></param>
    /// <returns></returns>
    public static Task<HttpResponseMessage> PostAsync(  
        this HttpClient httpClient, 
        string authorizationToken, string requestURI, 
        HttpContent content, string? platformAccessToken = null)
    {
        HttpRequestMessage request = new(HttpMethod.Post, requestURI);
        request.Headers.Add("Authorization", "Bearer " + authorizationToken);
        request.Content = content;
        if(platformAccessToken is not null && platformAccessToken.Length > 0)
        {
            request.Headers.Add("PlatformAccessToken", platformAccessToken);
        }

        return httpClient.SendAsync(request, CancellationToken.None);
    }

    /// <summary>
    /// Extensionmethod to add Authorization token and access token to the header
    /// </summary>
    /// <param name="httpClient"></param>
    /// <param name="authorizationToken"></param>
    /// <param name="requestURI"></param>
    /// <param name="content"></param>
    /// <param name="platformAccessToken"></param>
    /// <returns></returns>
    public static Task<HttpResponseMessage> PutAsync(
        this HttpClient httpClient, 
        string authorizationToken, string requestURI,
        HttpContent content, string? platformAccessToken = null)        
    {
        HttpRequestMessage request = new(HttpMethod.Put, requestURI);
        request.Headers.Add("Authorization", "Bearer " + authorizationToken);
        request.Content = content;

        if(platformAccessToken is not null && platformAccessToken.Length > 0)
        {
            request.Headers.Add("PlatformAccessToken", platformAccessToken);
        }

        return httpClient.SendAsync(request, CancellationToken.None);
    }


    /// <summary>
    /// Extensionmethod to add Authorization token and access token to the header
    /// </summary>
    /// <param name="httpClient"></param>
    /// <param name="authorizationToken"></param>
    /// <param name="requestURI"></param>
    /// <param name="content"></param>
    /// <param name="platformAccessToken"></param>
    /// <returns></returns>
    public static Task<HttpResponseMessage> GetAsync(
        this HttpClient httpClient, 
        string authorizationToken, string requestURI, 
        HttpContent content, string? platformAccessToken = null)
    {
        HttpRequestMessage request = new(HttpMethod.Get, requestURI);
        request.Headers.Add("Authorization", "Bearer " + authorizationToken);
        request.Content = content;
        
        if(platformAccessToken is not null && platformAccessToken.Length > 0)
        {
            request.Headers.Add("PlatformAccessToken", platformAccessToken);
        }

        return httpClient.SendAsync(request, CancellationToken.None);
    }

    /// <summary>
    /// Extensionmethod to add Authorization token and access token to the header
    /// </summary>
    /// <param name="httpClient"></param>
    /// <param name="authorizationToken"></param>
    /// <param name="requestURI"></param>
    /// <param name="content"></param>
    /// <param name="platformAccessToken"></param>
    /// <returns></returns>
    public static Task<HttpResponseMessage> DeleteAsync(
        this HttpClient httpClient,
        string authorizationToken, string requestURI,
        HttpContent content, string? platformAccessToken = null)
    {
        HttpRequestMessage request = new(HttpMethod.Delete, requestURI);
        request.Headers.Add("Authorization", "Bearer " + authorizationToken);
        request.Content = content;

        if(platformAccessToken is not null && platformAccessToken.Length > 0)
        {
            request.Headers.Add("PlatformAccessToken", platformAccessToken);
        }

        return httpClient.SendAsync(request, CancellationToken.None);
    }
}
