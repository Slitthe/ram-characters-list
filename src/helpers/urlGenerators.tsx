const characterStatusMap = new Map();
  characterStatusMap.set("all", "all");
  characterStatusMap.set("alive", "Alive");
  characterStatusMap.set("dead", "Dead");
  characterStatusMap.set("unknown", "unknown");

const getCharactersUrl = (nextPageUrl: string | null, name?: string, status?: string) => {
    let requestUrl = new URL('https://rickandmortyapi.com/api/character');
  
    requestUrl = new URL(nextPageUrl ? nextPageUrl : requestUrl.href);
  
    if(name !== undefined) {
      requestUrl.searchParams.append("name", name);
    }
  
    if(status !== undefined && status !== characterStatusMap.get("all")) {
      requestUrl.searchParams.append("status", status);
    }
  
    return requestUrl.href;
  }

export {characterStatusMap, getCharactersUrl };