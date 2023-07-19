async function triggerEvent(event) {
  const apiResponse = await fetch("https://connpass.com/api/v1/event/?series_id=9445&order=2&count=10");
  if(apiResponse.ok){
    const apiData = await apiResponse.json();
    const formattedData = apiData.events.map(item => {
      return {
        title: item.title,
        event_url: item.event_url,
        started_at: item.started_at,
        hash_tag: item.hash_tag,
      }
    })
    console.log(formattedData);
    const jsonData = JSON.stringify(formattedData)
    await CONNPASS_PROXY_KV.put('connpassData', jsonData)
  }
  else {
    console.log("RESPONSE NG", apiResponse.status)
  }
}

// Initialize Worker
addEventListener("scheduled", (event) => {
  event.waitUntil(triggerEvent(event));
});
