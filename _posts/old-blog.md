---
title: '舊 blog重溫'
excerpt: '因為忘記卸載 pwa了，所以還看得到之前的內容，剛好就搬過來了'
coverImage: '/assets/cover.jpg'
date: '2020-08-14'
ogImage:
  url: '/assets/cover.jpg'
---

這篇舊文不是直接全照搬過來的，裡面的一些語句都已依現況修改。關於舊 blog 的專案，你可以在[以前的紀錄](https://github.com/senlima0430/blog/tree/f6464d065dbfd4c32989b555b81751ac7ffccd47)裡看到它的身影。它主要使用：

- React: 習慣所以用了
- Recoil: 懶得用 Redux 所以用了
- TailwindCSS: for 閱聽者的頁面樣式
- Material-ui: admin 頁面會使用裡面的組件進行更改文檔等動作
- Firebase: 不想設置那麼多東西但又想開發新服務
- Google Analytics - 上面 Google，下面 Google，end

> 注意！現在版本與上個版本有著可觀的差異

#### 開始的第一版

![oldest version of blog](/assets/blog/old-blog/oldest.png)

原本的想法是想以 VS code 的排版方式呈現內容的，但是會有一個明顯的問題：內容重複。前面有提到這個 blog 在個人預期上不會高頻率地更新文章，再加上只有單調的文字內容，導致了在反覆瀏覽時會太過無聊。在講下一個改版前，先從右至左提一下組件的名稱為：Sidebar、Assetsbar 以及負責主要內容的 Container。在下文會反覆提到這些名字。

#### 第二版

![2.0 version of blog](/assets/blog/old-blog/v2.png)

很明顯的，Assetsbar 裡添加了圖片內容，也將 About page 的內容濃縮成 Profile card 放在 Assetsbar 上面，在 Container 中也加入了一些簡介以取代不必要的內容重複，分割了 client 和 admin 之間的一點共通性，在管理頁面將 Assetsbar 換成 Sidebar(因為很明顯的我知道我是誰，所以對於我管理者和概覽管理頁面而言，Assetsbar 太過冗贅)。不過這樣改了之後又發現了一件事：資訊過多...

一個主頁上 Container 有一些簡略的自介，Assetsbar 裡面有各個內容種類的概覽以及 Profile card，雖然主頁能直接了當的提供用戶所有能看得到的內容，但是用戶需要嗎？從文章連結進去，雖然 Container 確實地渲染了文章內容，但對於只看單一文章的用戶而言， Assetsbar 的存在顯得非常的礙眼，因為點文章連結進去的目的就只會是想看文章，隨之而來的就是頁面的擴張性被減少許多，Assetsbar 對於閱聽者而言太「沈重」了，一直待在右邊，也已經不會有什麼多餘的互動性了(對於一個只能 "read"的用戶而言)，其他頁面也會被其干擾。

於是決定用另一種角度去進行編排，擺脫原先的想法，讓頁面擴展性大幅提昇。

#### 最新版(8/14)

![2020/8/14 version of this blog](/assets/blog/old-blog/v3.png)

新增了 react spring 並將 Assetsbar 刪掉，讓每個頁面都能專注在 Container 的內容上。

#### 結論(x

排版不難，重新設計網頁也不是什麼世界難題，就像我剛剛寫了一小時的文章一不小心 command + w 就全沒了也就認了再寫而已(回想當下完全沒有任何情緒就重新打字的我的心態實在恐怖)，關鍵是能不能擺脫過往的思考模式以及視角去增加或是修改組件存在的意義，如同程式一樣，關鍵不是在於它賺不賺得了錢(不是我太理想化，這就像一個人在新創寫大型專案時候也希望不會有 legacy code，但還是被 deadline 壓出 💩 來)，而是寫程式出來的產品能不能解決一些問題。

不僅僅是在視覺上會用不同的角度去看待和思考，我也會在各種創作開發上會有這種習慣，而這也是為什麼我很難寫得出文章，因為動不動就會被全刪掉了。而這就是為什麼，這個 blog 都他\*的不怎麼更新文章的原因。
