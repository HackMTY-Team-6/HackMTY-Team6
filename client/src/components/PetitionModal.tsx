interface Props {
    handleCloseModal: () => void
}

const PetitionModal = ({ handleCloseModal }: Props) => {


    return (
        <div className='h-[700px] w-[500px]'>
            <button onClick={() => handleCloseModal()} className='bg-slate-200'>close</button>
            dsa
        </div>
    )
}

export default PetitionModal