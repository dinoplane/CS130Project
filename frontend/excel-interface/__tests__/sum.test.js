import { render, screen, queryByAttribute } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'

const getById = queryByAttribute.bind(null, 'id')

describe('Home', () => {
    test('renders Home', () => {
        const dom = render(<Home />)
        expect(screen.getByRole('heading')).toHaveTextContent(
            'Excellent Interface'
        )
    })
})
