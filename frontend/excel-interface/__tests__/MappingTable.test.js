import {fireEvent, render, screen, queryByAttribute} from "@testing-library/react"
import userEvent from '@testing-library/user-event'

import renderer from 'react-test-renderer';
import getDateTodayString from "@/app/getdatestring";
import MappingManager from "@/app/mapping_manager";
import MappingTable from "@/app/mapping_table";
// import  from "@/app/mapping_table";


const mappingManager = new MappingManager();
const MAPPINGS = [
    {
      id: 0,
      mapping_query: "SELECT COURSE WHERE COURSE.NAME = CS130",
      date_modified: "10/19/2023",
    },
    {
      id: 1,
      mapping_query: "SELECT COURSE WHERE STUDENTS_ENROLLED > 30 AND DEPT = CS",
      date_modified: "10/20/2023",
    },
    {
      id: 2,
      mapping_query: "SELECT PROFESSOR WHERE COURSE.NAME = CS130",
      date_modified: "10/21/2023",
    },
  ];

// Remember to mock the date function
// jest.mock('../src/app/mapping_table', () => {
//     const originalModule = jest.requireActual('../src/app/mapping_table');

//     //Mock the default export and named export 'foo'
//     return ({
//         __esModule: true,
//         ...originalModule,
//         getDateTodayString: jest.fn(() => {
//             console.log("HALLO")
//             return '10/21/2023'}
//         ),
//     });
// });

jest.mock('../src/app/getdatestring',
    () => jest.fn(()=>"10/21/2023"))

console.log(getDateTodayString())


describe ('Mapping Table', function () {
    // afterAll(() => {
    //     jest.resetAllMocks();
    // });

    describe('rows are added when', function () {
        it('the user, opens a row and clicks the confirm button', () => {
            const component = render(
                <MappingTable mappings={[]} mappingManager={mappingManager} />
            );
            expect(component).toMatchSnapshot();

            // Open a row
            let openrow_button = component.container.querySelector('#openBtn');
            fireEvent.click(openrow_button);
            expect(component).toMatchSnapshot();

            // Input and add
            let query_input = component.getByPlaceholderText("Enter Mapping Query");
            fireEvent.change(query_input, {target: {value: 'SELECT COURSE WHERE COURSE.NAME = CS130'}})

            let addrow_button = component.container.querySelector('#addBtn');
            fireEvent.click(addrow_button);

            expect(component).toMatchSnapshot();
        });

        it('the user, opens a row and presses enter', async () => { // Check this test
            const user = userEvent.setup()
            const component = render(
                <MappingTable mappings={[]} mappingManager={mappingManager} />
            );
            expect(component).toMatchSnapshot();

            // Open a row
            let openrow_button = component.container.querySelector('#openBtn');
            fireEvent.click(openrow_button);
            expect(component).toMatchSnapshot();

            // Input and press enter
            let query_input = component.getByPlaceholderText("Enter Mapping Query");
            fireEvent.change(query_input, {target: {value: 'SELECT COURSE WHERE COURSE.NAME = CS131'}})

            await user.keyboard('{Enter}');

            let rows = component.container.querySelectorAll('[class="entry_row"]')
            expect(rows.length).toBe(1);

            expect(component).toMatchSnapshot();


        });
    });

    describe('the user deletes rows when', function () {

        it('the user clicks on nothing, but tries to delete, deleting nothing', () => {
            const component = render(
                <MappingTable mappings={MAPPINGS} mappingManager={mappingManager} />
            );
            expect(component).toMatchSnapshot();

            let delrow_button = component.container.querySelector('#delBtn');
            fireEvent.click(delrow_button);

            let rows = component.container.querySelectorAll('[class="entry_row"]')
            expect(rows.length).toBe(MAPPINGS.length);

            expect(component).toMatchSnapshot();
        });

        it('the user clicks on 2 entry checkboxes and delete button', () => {
            const component = render(
                <MappingTable mappings={MAPPINGS} mappingManager={mappingManager} />
            );
            expect(component).toMatchSnapshot();

            let rows = component.container.querySelectorAll('[class="entry_row"]')

            fireEvent.click(rows[0].querySelector('input[type="checkbox"]'))
            fireEvent.click(rows[2].querySelector('input[type="checkbox"]'))

            let delrow_button = component.container.querySelector('#delBtn');
            fireEvent.click(delrow_button);

            rows = component.container.querySelectorAll('[class="entry_row"]')
            expect(rows.length).toBe(1);

            expect(component).toMatchSnapshot();
        });

        it('the user clicks on 2 entry checkboxes, unclicks 1, and deletes', () => {
            const component = render(
                <MappingTable mappings={MAPPINGS} mappingManager={mappingManager} />
            );
            expect(component).toMatchSnapshot();

            let rows = component.container.querySelectorAll('[class="entry_row"]')

            fireEvent.click(rows[0].querySelector('input[type="checkbox"]'))
            fireEvent.click(rows[2].querySelector('input[type="checkbox"]'))
            fireEvent.click(rows[0].querySelector('input[type="checkbox"]'))

            let delrow_button = component.container.querySelector('#delBtn');
            fireEvent.click(delrow_button);

            rows = component.container.querySelectorAll('[class="entry_row"]')
            expect(rows.length).toBe(2);

            expect(component).toMatchSnapshot();
        });


        it('the user clicks on a parent entry checkbox and deletes', () => {
            const component = render(
                <MappingTable mappings={MAPPINGS} mappingManager={mappingManager} />
            );
            expect(component).toMatchSnapshot();

            let parentchkbox = component.container.querySelector('#parent-checkbox');
            fireEvent.click(parentchkbox);

            let delrow_button = component.container.querySelector('#delBtn');
            fireEvent.click(delrow_button);

            let rows = component.container.querySelectorAll('[class="entry_row"]')
            expect(rows.length).toBe(0);

            expect(component).toMatchSnapshot();
        });

    });

    describe('the user uploads mappings when', function () {
        it('the user clicks on a parent entry checkbox and deletes', () => {
            const component = render(
                <MappingTable mappings={MAPPINGS} mappingManager={mappingManager} />
            );
            expect(component).toMatchSnapshot();

            let parentchkbox = component.container.querySelector('#parent-checkbox');
            fireEvent.click(parentchkbox);

            let uplrow_button = component.container.querySelector('#uplBtn');
            fireEvent.click(uplrow_button);

            // let rows = component.container.querySelectorAll('[class="entry_row"]')
            // expect(rows.length).toBe(0);

            expect(component).toMatchSnapshot();
        });
    });

    describe('the user downloads mappings when', function () {
        it('the user clicks on a parent entry checkbox and deletes', () => {
            const component = render(
                <MappingTable mappings={MAPPINGS} mappingManager={mappingManager} />
            );
            expect(component).toMatchSnapshot();

            let parentchkbox = component.container.querySelector('#parent-checkbox');
            fireEvent.click(parentchkbox);

            let dwnrow_button = component.container.querySelector('#dwnBtn');
            fireEvent.click(dwnrow_button);

            // let rows = component.container.querySelectorAll('[class="entry_row"]')
            // expect(rows.length).toBe(0);

            expect(component).toMatchSnapshot();
        });
    });



});
