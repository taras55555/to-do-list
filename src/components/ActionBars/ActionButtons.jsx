import CustomizedButton from "../Buttons/CustomizedButton";

export default function ActionButtons({ toDoList, setChecked, activeFilter, setActiveFilter, calculateTaskStatus }) {

    const { done = 0, active = 0, all = 0 } = calculateTaskStatus();

    return (
        <>
            {toDoList.length > 0 && (
                <>
                    <section className="regular-box">
                        <CustomizedButton
                            title={`active (${active})`}
                            onClick={() => setActiveFilter({ active: true })}
                            disabled={activeFilter.active}
                        />
                        <CustomizedButton
                            title={`done (${done})`}
                            onClick={() => setActiveFilter({ done: true })}
                            disabled={activeFilter.done}
                        />
                        <CustomizedButton
                            title={`all (${all})`}
                            onClick={() => setActiveFilter({ all: true })}
                            disabled={activeFilter.all}
                        />
                        <CustomizedButton
                            onClick={() => setChecked(toDoList.map((task) => task.id))}
                            title={'Select All'}
                        />
                        <CustomizedButton
                            onClick={() => setChecked([])}
                            title={'Deselect All'}
                        />
                    </section>

                </>
            )
            }
        </>
    )
}