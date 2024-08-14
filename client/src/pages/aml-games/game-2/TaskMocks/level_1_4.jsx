import Sizebox from "../../../../components/courseTemplates/common/Sizebox";
import Divider from "../../components/divider";
import FolderQuiz from "../../components/folder-quiz";
import { folder_list_1, folder_list_2 } from "./data";


function Level_1_4() {
    return ( 
        <>
            <h2>Задача 1</h2>
            <FolderQuiz 
                desc={
                    <><p>
                        Задание: необходимо определить минимальное количество данных, которые войдут в «Досье» на каждого клиента (ФЛ). Помните, что правильно составленное Досье поможет снизить риски и обеспечить соблюдение законодательства о ПОД/ФТ.
                    </p>
                    <p>
                        Перетащите или оставьте необходимую вам информацию для дальнейшей работы.
                    </p></>
                }
                title={'Информация о клиенте'}
                list={folder_list_1}
                maxItems={6}
            />

            <Sizebox height={50} />
            <Divider />
            
            <Sizebox height={50} />
            <h2>Задача 2</h2>
            <FolderQuiz 
                desc={
                    <><p>
                        Задание: необходимо определить минимальное количество данных, которые войдут в «Досье» на каждого клиента (ФЛ). Помните, что правильно составленное Досье поможет снизить риски и обеспечить соблюдение законодательства о ПОД/ФТ.
                    </p>
                    <p>
                        Перетащите или оставьте необходимую вам информацию для дальнейшей работы.
                    </p></>
                }
                title={'Информация по операции'}
                list={folder_list_2}
                maxItems={3}
            />
        </>
    );
}

export default Level_1_4;