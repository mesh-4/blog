type Props = {
  content: string
}

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto markdown-body">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
