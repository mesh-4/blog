import React, { useState } from 'react'
import { firestore } from 'firebase/app'
import { MdCloudUpload } from 'react-icons/md'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { ImageItem } from '../components/ImageItem'
import { ImageCreateModal } from '../components/ImageCreateModal'

export function Images() {
  const [onUpload, setUpload] = useState(false)

  const [images, loading] = useCollectionData(
    firestore().collection('images').orderBy('createdAt', 'desc'),
    {
      idField: 'id',
    }
  )

  function handleUploadClose() {
    setUpload(false)
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <p className="pt-8 mb-4 text-3xl">Images</p>

        <Grid container spacing={2}>
          {loading && (
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Skeleton height={225} animation="wave" variant="rect" />
            </Grid>
          )}

          {!loading &&
            images.map(image => (
              <ImageItem key={image.id} filename={image.filename} />
            ))}

          <Grid items xs={12} md={6} lg={4} xl={3}>
            <button
              type="button"
              className="w-full cursor-pointer outline-dotted-primary flex items-center justify-around"
              style={{ height: '225px' }}
              onClick={() => setUpload(true)}
            >
              <div>
                <MdCloudUpload className="mx-auto" />
                <p>Upload</p>
              </div>
            </button>
          </Grid>
        </Grid>

        <ImageCreateModal open={onUpload} onClose={handleUploadClose} />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}
