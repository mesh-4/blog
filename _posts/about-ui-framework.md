---
title: '關於一些 UI 框架'
excerpt: '抱怨一些 UI框架，另外推薦我現在常用的'
coverImage: '/assets/cover.jpg'
date: '2020-10-22'
ogImage:
  url: '/assets/cover.jpg'
---

我不喜歡 material ui 的原因是它們雖然提供了堪稱優秀的組件，但是兩位在要客制還是全局依賴的選擇上顯得模糊不清。

你可以透過 `makeStyles`、`withStyles`、CSS 等方式去客制你的組件，也許對於中小規模的專案是個不錯的選擇，但是當專案一大，要客制的東西越來越多，管理要如何使用哪種方式和要如何衡量專案檔案架構的管理和維護成本並不合理和價值，另外組件 props 的命名方式也不直觀，`gutterBottom`、`spacing`、`elevation`等命名在大多數場景是不必要的，大多數名詞和 CSS 的相關值都沒有直接聯繫甚至還有誤導的可能。一連串的使用體驗不佳，讓我只會在小型專案去考慮使用。

```jsx
// when it becomes to large scale
// it will be a massive disaster
// that break your project & file structure
const useStyles = makeStyles(theme => ({
  container: {
    width: '80%',
    maxWidth: '768px',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      alignItems: 'center',
    },
  },
}))

const UserLayout = () => {
  const classes = useStyles()

  return (
    <Gird
      className={classes.container}
      component="main"
      container
      spacing={5}
    >
      <Button variant="contained">Hello World!</Button>
    </Grid>
  )
}
```

其實 ant design 已經坐到了我心裡的一半，24 欄已經能滿足大部分排版，layout 更是簡化了一些「機械化」的排版動作，也有許多完善的資料展示和互動介面。但它只能客制顏色主題，不過我也認同這樣的選擇，基於組件庫的完善度去讓應用的風格一體化，維護和開發框架者可以更專注於組件的功能全面性而不是樣式的多樣化。不過這對於想要前後台都選用同一個 UI 框架的人有點可惜，與其說是「企业级产品设计体系」，不如說是 “仅限于企业层面的产品设计体系”。

在我的定義裡面 style-components、emotion 和 styled system 等這樣的工具裡是「UI 框架的基底」，使用這些東西做出來的 UI 框架組件大多數都能依賴原有基底的方便 shorthand 或是客制方面的語法糖來製造更大的客制化空間，譬如說 evergreen(不是長榮)是基於 ui-box 去衍生為各個充滿可客製化空間的組件，不過可惜的是在 type definition 的表現上略顯雞肋，資料互動組件完善度仍有很大的空間。

不過接下來要講的，就是目前個人使用上最舒適的：

#### chakra-ui

基於 styled system 建成的框架給了其強大的可客制空間，大多數要客制的時候，不用新增 CSS 檔案、不用在組件外部多加一個落落長的 function、不用困惑於樣式 props，你只要在組件本身增加你想要的客制化元素即可：

```jsx
const UserLayout = ({ children }): React.FC => {
  return (
    <Flex
      as="main"
      width="80%"
      maxWidth="768px"
      align={
        { base: 'flex-start', md: '' }
        // or you can use ['flex-start', 'center']
      }
    >
      {children}
    </Flex>
  )
}
```

組件最重要的元素直接作為組件名稱，藉由 styled system，組件的樣式 props 名詞都貼合 CSS 對應值。自適應需求以用簡短的語句去實現，也可以和各個第三方工具聯合使用。譬如 react-hook-form、framer-motion，因為出身 typesript，所以 type definition 相較 evergreen 要完善許多。此時此刻，這個框架仍在成長，大部分 issue 都在積極處理，個人很看好它日後的發展。
