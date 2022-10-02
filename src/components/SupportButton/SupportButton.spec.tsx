import {render} from '@testing-library/react'
import { SupportButton } from '.'

test('should render correctly header', () => {
  const {debug} = render (
    <SupportButton/>
  )
})