import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { deleteSelectedCache } from "../../services/caching/deleteSelectedCache";
import { getAllCachesInMemory } from "../../services/caching/getAllCachesInMemory";

import { Container } from "./styles";

export function History() {
  const user = JSON.parse(localStorage.getItem("bycoders-user") as any);
  const accessToken = localStorage.getItem("bycoders-accessToken") ?? false;

  const [sugestionsInCache, setSugestionsInCache] = useState([]) as any;

  useEffect(() => {
    if (accessToken) {
      getAllCachesInMemory().then((res) => {
        const caches = res.filter((cache: any) => {
          if (cache.userId === user.id) {
            return cache;
          }
        });

        setSugestionsInCache(caches);
      });
    }
  }, [handleRemoveHistory]);

  function handleRemoveHistory(id: number) {
    deleteSelectedCache(id);
  }

  return (
    <>
      <Header />

      <Container>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 histories-header">
              <h4>Histories</h4>
            </div>

            <div className="col-lg-12 histories-body">
              <ul>
                {!!sugestionsInCache.length ? (
                  sugestionsInCache.map((suggestion: any, index: number) => (
                    <li key={index}>
                      {suggestion.filterName}
                      <a
                        href="#"
                        onClick={() => handleRemoveHistory(suggestion.id)}
                      >
                        Remove
                      </a>
                    </li>
                  ))
                ) : (
                  <span>Don't have histories</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
