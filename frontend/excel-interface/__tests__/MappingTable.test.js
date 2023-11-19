import {fireEvent, render, screen} from "@testing-library/react"

// import {render} from '@testing-library/react'
import MappingTable from "@/app/mapping_table";
import MappingManager from "@/app/mapping_manager";


const mappingManager = new MappingManager();
const MAPPINGS = [
    {
      id: 0,
      mapping_query: "SELECT STUDENT WHERE COURSE.NAME = CS130",
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

it('adding a row', () => {
    const component = render(
        <MappingTable mappings={MAPPINGS} mappingManager={mappingManager} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // console.log(component)
    let addrow_button = component.container.querySelector('#addBtn');
    // console.log(addrow_button)

    fireEvent.click(addrow_button);

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();


    // console.log(tree.props)

    // // Open a template
    // renderer.act(
    //     () => {

    //     }
    // )

    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();


    //     // manually trigger the callback
    // renderer.act(() => {
    //     tree.props.addRow("SELECT PROFESSOR WHERE COURSE.NAME = CS130");
    // });

    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});


