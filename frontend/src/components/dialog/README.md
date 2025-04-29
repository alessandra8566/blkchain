# Dialog

## Usage

### With header

```typescript
import { Dialog, DialogBody, DialogFooter } from "@/components/dialog"
import { Button } from "@/components/ui/button"
import { ReactComponent as WarningIcon } from "@/assets/icons/dialog/warning.svg"

function WithHeader() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Dialog open={open} setOpen={setOpen} backdropClose={true} header={true} title="新增帳戶">
        <DialogBody>
          <WarningIcon className="mx-auto" />
          <p className="mt-5 text-center">確定要刪除帳戶嗎？</p>
        </DialogBody>
        <DialogFooter board={true}>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button>刪除</Button>
        </DialogFooter>
      </Dialog>
      <Button onClick={() => setOpen(true)}>open</Button>
    </>
  )
}
```

### Without header

```typescript
import { Dialog, DialogBody, DialogFooter } from "@/components/dialog"
import { Button } from "@/components/ui/button"

function WithoutHeader() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Dialog open={open} setOpen={setOpen} backdropClose={true} header={false}>
        <DialogBody>
          <p className="text-center">確定要登出嗎？</p>
        </DialogBody>
        <DialogFooter board={true}>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button>登出</Button>
        </DialogFooter>
      </Dialog>
      <Button onClick={() => setOpen(true)}>open</Button>
    </>
  )
}
```

## Props

### Dialog

| Prop name     | Type                     | Default value                                          | Description                          |
| ------------- | ------------------------ | ------------------------------------------------------ | ------------------------------------ |
| open          | boolean                  | **(required)**                                         |                                      |
| setOpen       | (value: boolean) => void | **(required)**                                         |                                      |
| children      | React.ReactNode          | **(required)**                                         |                                      |
| backdropClose | boolean                  | `false`                                                | 點擊背景是否關閉 Dialog              |
| className     | string                   |                                                        | tailwind css class name              |
| header        | boolean                  | **(required)**                                         | 如果是 `false` 則不會顯示 title 區塊 |
| title         | string                   | 當 `header` 為 `true` 時 **(required)**                | Dialog 的標題文字                    |
| closeButton   | boolean                  | 當 `header` 為 `true` 時可加入，不加入時預設為 `false` | 標題區塊右方關閉按鈕                 |

### DialogBody

| Prop name | Type            | Default value  | Description             |
| --------- | --------------- | -------------- | ----------------------- |
| children  | React.ReactNode | **(required)** |                         |
| className | string          |                | tailwind css class name |

### DialogFooter

| Prop name | Type            | Default value  | Description             |
| --------- | --------------- | -------------- | ----------------------- |
| children  | React.ReactNode | **(required)** |                         |
| board     | boolean         | `false`        | `DialogFooter` 上方框線 |
| className | string          |                | tailwind css class name |
