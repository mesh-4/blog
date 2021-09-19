---
slug: to-docusaurus
title: Hi! Docusaurus
tags: [docusaurus]
---

從上一版的 nextjs blog 轉到用 docusaurus。
從最初的 blog 可以 manage content with Firebase 再到 Nextjs 的 Markdown blog，
到現在用 docusaurus 去寫 blog...

<!--truncate-->

用這麼多東西其實也不是覺得效能之類的，只是覺得高興所以換了一個框架或是套件去寫而已。
不過直接用 docusaurus 的確省下了許多設定的步驟。

對於我而言，比較重要的原因是有 live code block 可以玩這件事。

```jsx live
function Button() {
  const rendererCount = useRef(0)
  const [count, setCount] = useState(0)

  rendererCount.current += 1

  function handleClick() {
    setCount(prev => (prev += 1))
  }

  return (
    <div>
      <p>{rendererCount.current} render</p>
      <p>current count: {count}</p>
      <button type="button" onClick={handleClick}>
        counter +1
      </button>
    </div>
  )
}
```

蠻不錯的，所以就更新成目前這樣了。
