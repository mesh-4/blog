---
slug: first-try-relay
title: 初試 GraphQL Relay
tags: [react, relay]
---

原本是用 Apollo GraphQL 在開發的，有鑑於 GraphQL 是由 Facebook 開發的，所以自然對於 Relay 感到好奇。

<!--truncate-->

相比於 Apollo GraphQL 的自由性以及高社群活躍性，Relay 的學習曲線不僅高，而且也找不到什麼可以用的專案參考，
而且 Facebook 在三月初才剛推出 [relay hooks](https://relay.dev/blog/2021/03/09/introducing-relay-hooks)，整個 documentation 的排列和內容都還有許多可以改進的內容。

在後端的部分與 Apollo GraphQL 不同的點就是 Relay 需要 server 的 schema 需要符合[特定的規格](https://relay.dev/docs/guides/graphql-server-specification/)，但是同樣的，網上沒有什麼相關後端實踐的 repo，自己選擇使用 [postgraphile](https://www.graphile.org/) 順便學一學 psql，其他的也有 graphql-sequelize 或是 Harusa 等套件或平台可以幫忙快速建立起來。如果不想用太多套件實現，可以直接參考[物件的實現方法](https://graphql.org/learn/global-object-identification/)和 [cursor connections 的規格書](https://relay.dev/assets/files/connections-61fc54c286f0afc0b4f230f7c4b150bf.htm#sec-Connection-Types)去實現。

對於開發產品的後端其實有蠻多工具可以用的，但是純用 `graphql-relay-js` 和資料庫去搭建一個後端的相關 repo 實在太少，略為可惜。

在前端的部分很明顯地和 Apollo GraphQL 不同的地方就是嚴謹性更高，
由於被 schema 規定住了導致組件在會用到什麼資料以及要如何分 component 都會更加三思。
在用 Relay 的開發中也會越來越注重 Render-as-you-fetch。

Relay 目前文檔不太完整，而且社群的活躍度真的差 Apollo 太多，
Relay 有著跟 Redux 一樣的學習曲線，但是沒有 Redux 的社群活躍度(even stackoverflow)，
如果要入門 GraphQL，不建議直接學 Relay，畢竟 Relay 能做的 Apollo 和 urql 都能做到，
但是如果要讓自己在 GraphQL 的開發上更有架構和嚴謹性，
或是你的產品架構比較大和複雜，
Relay 應該能幫助你提昇自己的實力或減少許多管理架構的成本。
