import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { api } from "@/lib/api"

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0
    },
    onSubmit: async ({ value }) => {
      const {ok} = await api.expenses.$post({json: value})
      if(!ok) {
        throw new Error('Server error')
      }
      navigate({to: '/expenses'})
    }
  })
  return (
    <div className="p-4 max-w-lg m-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation()
          form.handleSubmit();
        }}
      >
        <div className='flex flex-col space-y-2'>
          <form.Field
            name='title'
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  type="text"
                  id={field.name}
                  placeholder="Title"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ?? <em>{field.state.meta.errors}</em>}
              </>
            )}
          />
          <form.Field
            name='amount'
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  type="number"
                  id={field.name}
                  placeholder="$00.00"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.errors ?? <em>{field.state.meta.errors}</em>}
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className='mt-4 w-32' type='submit' disabled={!canSubmit}>{isSubmitting ? '...' : 'Create Expense'}</Button>
          )}
        />

      </form>
    </div>
  )
}
