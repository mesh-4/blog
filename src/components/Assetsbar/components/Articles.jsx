import React from 'react'
import { Link } from 'react-router-dom'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Skeleton from '@material-ui/lab/Skeleton'

export const ArticleAssetList = () => {
  const [articles, loading] = useCollectionData(
    firestore()
      .collection('markdowns')
      .where('draft', '==', false)
      .orderBy('updatedAt', 'desc'),
    { idField: 'id' }
  )

  if (loading)
    return (
      <li className="mx-auto py-3 w-11/12 text-sm font-light bg-dark1 flex flex-no-wrap">
        <div
          className="flex-none mr-3"
          style={{
            width: '85px',
            height: '85px',
          }}
        >
          <Skeleton animation="wave" variant="rect" width={85} height={85} />
        </div>
        <div className="flex flex-col flex-auto w-full">
          <h2 className="text-base m-0">
            <Skeleton animation="wave" variant="text" width="40%" />
          </h2>
          <p className="text-sm mb-4">
            <Skeleton animation="wave" variant="text" />
          </p>
        </div>
      </li>
    )

  if (articles.length === 0) {
    return <li>No any article.</li>
  }

  return articles.map(({ id, slug, cover, title, subtitle }, index) => (
    <li
      key={id}
      className={`mx-auto py-3 w-11/12 text-sm font-light bg-dark1 flex flex-no-wrap ${
        index === articles.length - 1 ? '' : 'border-b'
      } border-solid border-gray-400`}
    >
      <div
        className="flex-none mr-3"
        style={{
          width: '85px',
          height: '85px',
          backgroundImage: `url(${cover})`,
          backgroundColor: '#404040',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <article className="flex-auto w-full">
        <div className="flex flex-col flex-wrap w-full mb-4">
          <Link
            className="block w-full mb-2 text-base"
            to={`/article/${slug}`}
          >
            <h2 className="text-base font-semibold leading-normal">
              {title}
            </h2>
          </Link>
          <Link className="block text-sm w-full" to={`/article/${slug}`}>
            <p className="text-secondary font-normal">{subtitle}</p>
          </Link>
        </div>
      </article>
    </li>
  ))
}
