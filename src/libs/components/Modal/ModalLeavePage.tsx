import { useRouteChangeEvents } from 'nextjs-router-events'
import { useCallback, useEffect, useState } from 'react'
import { Modal } from '../Modal'

type ModalLeavePageProps = {
  isDirty: boolean
}

const ModalLeavePage = ({ isDirty }: ModalLeavePageProps) => {
  const [showModalConfirmLeavePage, setShowModalConfirmLeavePage] = useState(false)
  const [actionBackPage, setActionBackPage] = useState(false)

  const onBeforeRouteChange = useCallback(() => {
    window.onload = () => {
      window.history.pushState(null, '', window.location.href)
    }

    if (isDirty) {
      setShowModalConfirmLeavePage(true)
      return false
    }

    return true
  }, [isDirty])

  useEffect(() => {
    if (history.pushState && isDirty) {
      history.pushState(null, document.title, location.href)

      const handlePopstate = (event: Event) => {
        event.preventDefault()
        setShowModalConfirmLeavePage(true)
        setActionBackPage(true)
      }

      window.addEventListener('popstate', handlePopstate)
      window.history.pushState({ modalOpened: false }, '')

      return () => {
        window.removeEventListener('popstate', handlePopstate)
      }
    }
  }, [isDirty])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })

  const handleConfirmLeavePage = () => {
    if (actionBackPage) {
      history.go(-2)
      setShowModalConfirmLeavePage(false)
      return
    }

    allowRouteChange()
  }

  const handleCloseModalLeavePage = () => {
    if (actionBackPage) {
      setActionBackPage(false)
      setShowModalConfirmLeavePage(false)
      history.pushState(null, document.title, location.href)

      return
    }

    setShowModalConfirmLeavePage(false)
  }

  return (
    <Modal
      open={showModalConfirmLeavePage}
      handleCloseModal={handleCloseModalLeavePage}
      handleSubmit={handleConfirmLeavePage}
      textSubmit="保存せず閉じる"
      title="データが保存されていません"
      description="入力中のデータは全て破棄されますが、よろしいですか？"
      textCancel="入力に戻る"
    />
  )
}

export { ModalLeavePage }
