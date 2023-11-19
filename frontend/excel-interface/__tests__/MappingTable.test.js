import {fireEvent, render, screen, queryByAttribute} from "@testing-library/react"
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
            console.log(getDateTodayString())

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
            fireEvent.change(query_input, {target: {value: 'SELECT COURSE WHERE COURSE.NAME = CS13'}})

            let addrow_button = component.container.querySelector('#addBtn');
            fireEvent.click(addrow_button);

            expect(component).toMatchSnapshot();


            // // Add a couple rows
            // let mapping_query = "SELECT COURSE WHERE COURSE.NAME = CS13"
            for (let i = 1; i < 4; i++){
                // Open a row
                openrow_button = component.container.querySelector('#openBtn');
                fireEvent.click(openrow_button);
                expect(component).toMatchSnapshot();

                // Input and add
                query_input = component.getByPlaceholderText("Enter Mapping Query");
                fireEvent.change(query_input, {target: {value: `SELECT COURSE WHERE COURSE.NAME = CS13${i}`}})

                addrow_button = component.container.querySelector('#addBtn');
                fireEvent.click(addrow_button);

                expect(component).toMatchSnapshot();
            }
});





    });
});
