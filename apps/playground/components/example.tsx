'use client'
import { Button } from '@your-org/button'
import React from 'react'

// ### IMPORT COMPONENT HERE ###
import LibPreview from './lib'
import ButtonPreview from './button'
// import SelectPreview from '../Select';
// import { Button, HeroUIProvider } from '@heroui/react';
// import HooksPreview from '../Hooks';
// import ModalBoxPreview from '../ModalBox';
// import TextEditorPreview from '../TextEditor';
// import DatePickerPreview from '../DatePicker';
// import MenuBoxPreview from '../MenuBox';
// import SelectChipPreview from '../SelectChip';

interface componentListProps {
  name: string
  component: React.ReactNode
}

/**
 * Add your components here...
 */
const COMPONENT_LIST: componentListProps[] = [
  //
  // ### APPEND COMPONENT HERE ###

  {
    name: 'Button',
    component: <ButtonPreview />,
  },

  {
    name: 'Lib',
    component: <LibPreview />,
  },
  //   {
  //     name: 'Hooks',
  //     component: <HooksPreview />,
  //   },
  //   {
  //     name: 'DatePicker',
  //     component: <DatePickerPreview />,
  //   },
  //   {
  //     name: 'ModalBox',
  //     component: <ModalBoxPreview />,
  //   },
  //   {
  //     name: 'SelectChip',
  //     component: <SelectChipPreview />,
  //   },
  //   {
  //     name: 'MenuBox',
  //     component: <MenuBoxPreview />,
  //   },
  //   {
  //     name: 'TextEditor',
  //     component: <TextEditorPreview />,
  //   },
  // {
  //   name: 'Select',
  //   component: <SelectPreview />,
  // },
  //
]

function Example() {
  const [component, setComponent] = React.useState<componentListProps>({
    name: '',
    component: <></>,
  })
  const [param, setParam] = React.useState<string | null>(null)

  const viewComponent = (name: string) => {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('component', name)
    window.location.search = urlParams as unknown as string
  }

  React.useEffect(() => {
    setTheme(window?.localStorage?.getItem('theme') || 'light')

    if (window?.location?.search) {
      const urlParams = new URLSearchParams(window.location.search)
      const myParam = urlParams.get('component')
      setParam(myParam as string)
      const currentComponent = COMPONENT_LIST.find(
        ({ name }) => name === myParam
      )
      setComponent(currentComponent || COMPONENT_LIST[0])
    }
  }, [])

  const [theme, setTheme] = React.useState(
    'light' // Default to light
  )

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <>
        <div style={{ maxWidth: '100%', minHeight: '100%' }}>
          <div className="flex flex-row items-center justify-between bg-color-surfaceContainerHighest px-4 py-2 font-bold">
            <div />
            <Button
              size="sm"
              onClick={toggleTheme}
              className="rounded-md bg-color-onSurfaceVariant px-4 py-2 text-color-surfaceVariant"
            >
              {theme === 'dark' ? 'Dark' : 'Light'} Mode
            </Button>
          </div>
          {param ? (
            <div className="p-3"> {component?.component}</div>
          ) : (
            <>
              <h1 className="mx-4 mt-4 font-bold">{'Component List'}</h1>
              <div className="flex flex-row flex-wrap gap-4 p-4">
                {COMPONENT_LIST.map((item, index) => (
                  <div
                    key={index}
                    className="trans duration-600 flex min-h-[40px] w-[320px] cursor-pointer items-center justify-center rounded-lg bg-primary-100 text-base text-primary transition-all hover:scale-105 hover:bg-primary hover:text-primary-50"
                    onClick={() => viewComponent(item.name)}
                  >
                    <h2 className="p-1">{item.name}</h2>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </>
    </>
  )
}

export default Example
