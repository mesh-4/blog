import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { firestore } from 'firebase/app'
import { TextField } from '@material-ui/core'
import {
  FaRegTrashAlt,
  FaCloudUploadAlt,
  FaPenSquare,
  FaPollH,
} from 'react-icons/fa'

import { PodcastDeleteModal } from './PodcastDeleteModal'
import { PodcastPublishModal } from './PodcastPublishModal'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export function PodcastItem({ audio }) {
  const { id, title, description, fileName, draft } = audio

  const [editorOpen, setEditorOpen] = useState(false)
  const [editorForm, setForm] = useState({ title, description })
  const [modals, setModals] = useState({ delete: false, publish: false })

  const handleModalStatus = (field, value) => {
    setModals({ ...modals, [field]: value })
  }

  const handleEditorOpen = () => {
    setEditorOpen(true)
  }

  const handleEditorChange = e => {
    const { name, value } = e.currentTarget
    setForm({ ...editorForm, [name]: value })
  }

  const handleEditorSubmit = async () => {
    try {
      await firestore()
        .collection('audio')
        .doc(id)
        .update({ ...editorForm })
      toast.success("Successfully update podcast's info")
      setEditorOpen(false)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <div className="my-4">
        <div
          className={`w-full flex items-center justify-between ${
            editorOpen ? 'pb-4' : 'pb-2'
          }`}
        >
          {editorOpen ? (
            <TextField
              fullWidth
              size="small"
              name="title"
              label="Title"
              color="primary"
              variant="outlined"
              value={editorForm.title}
              onChange={handleEditorChange}
              style={{ marginRight: '20px' }}
            />
          ) : (
            <p className="text-lg font-semibold">{title}</p>
          )}

          <div className="flex-none w-12 flex items-center justify-between">
            {editorOpen ? (
              <FaPollH
                className="cursor-pointer"
                onClick={handleEditorSubmit}
              />
            ) : (
              <FaPenSquare
                className="cursor-pointer"
                onClick={handleEditorOpen}
              />
            )}

            {draft && (
              <FaCloudUploadAlt
                className="cursor-pointer"
                onClick={() => handleModalStatus('publish', true)}
              />
            )}

            <FaRegTrashAlt
              className="cursor-pointer text-red-700"
              onClick={() => handleModalStatus('delete', true)}
            />
          </div>
        </div>

        <div className="pt-0 text-base">
          {editorOpen ? (
            <TextField
              rows={4}
              multiline
              fullWidth
              variant="outlined"
              name="description"
              label="Description"
              value={editorForm.description}
              onChange={handleEditorChange}
            />
          ) : (
            <ResponsiveEllipsis
              maxLine="2"
              ellipsis="..."
              basedOn="letters"
              text={description}
              component="section"
            />
          )}
        </div>
      </div>

      <PodcastDeleteModal
        open={modals.delete}
        onClose={() => handleModalStatus('delete', false)}
        target={{ id, fileName }}
      />
      <PodcastPublishModal
        open={modals.publish}
        onClose={() => handleModalStatus('publish', false)}
        target={{ id, fileName }}
      />
    </>
  )
}

PodcastItem.propTypes = {
  audio: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    draft: PropTypes.bool.isRequired,
  }).isRequired,
}
