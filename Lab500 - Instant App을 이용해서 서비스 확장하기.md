Lab500 - Instant App을 이용해서 서비스 확장하기
=======

이 랩에서는 Instant Apps에 대해서 다뤄 볼 것입니다. 사용자로 부터 대화만으로는 받아오기 힘든 정보들을 미리 만들어져 있는 form 을 보내서 손쉽게 받아 올 수 있는 기능입니다. 

이 랩을 하기전에 필요한 항목을 확인하세요. labfiles에서 아래의 파일이 있는지 확인해주세요.

- instantApp/instant_app_pdf(demo_usage_only).pdf
- instantApp/AgreementInstantApp.json
- code/flow_lab_500.txt

만들어져 있는 Instant app파일을 간단히 Export하실 수도 있고, 처음부터 만들어 보실 수도 있습니다. 

**Step 1: Instant App으로 들어가기**
=======

1. 우측 상단의 Instant App이라는 버튼을 눌러 인스턴트 앱 화면으로 들어가 주세요. 

![Screen Shot 2018-08-07 at 3.59.53 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%203.59.53%20PM.png)


**Step 2: Instant App 만들기**
=======

만들어져 있는 Instant app파일을 간단히 Export하실 수도 있고, 처음부터 만들어 보실 수도 있습니다. 처음부터 만들기 희망하시는 분은 A를, 만들어져 있는 파일을 import 하시고 싶으신분은 B를 따라 해 주세요. 


### A. 인스턴트 앱을 처음부터 만들기  

a. New Instant App -> Blank를 눌러주세요.

![Screen Shot 2018-08-07 at 3.59.43 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%203.59.43%20PM.png)


![Screen Shot 2018-08-07 at 4.02.59 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.02.59%20PM.png)

b. Bot에서 불러줄 ID를 만들어 줍니다. Name은 화면상에 보이는 이름, ID는 Bot에서 불러줄때 쓰는 명칭 입니다. 

![Screen Shot 2018-08-07 at 4.04.12 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.04.12%20PM.png)

c. Pane1에 6개의 component를 추가 해 주세요. 

![Screen Shot 2018-08-07 at 4.16.02 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.16.02%20PM.png)


        label 1
        
![Screen Shot 2018-08-07 at 4.13.31 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.13.31%20PM.png)

        single line input 1

![Screen Shot 2018-08-07 at 4.18.01 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.18.01%20PM.png)

        single line input 2

![Screen Shot 2018-08-07 at 4.19.04 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.19.04%20PM.png)

        selectMenu 1
        
![Screen Shot 2018-08-07 at 4.19.22 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.19.22%20PM.png)
![Screen Shot 2018-08-07 at 4.19.35 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.19.35%20PM.png)

        pdf는 instant_app_pdf(demo_usage_only)를 넣어주세요.

![Screen Shot 2018-08-07 at 4.32.01 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.32.01%20PM.png)
     
        Signature 

![Screen Shot 2018-08-07 at 4.32.29 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.32.29%20PM.png)

     
d. (optional) validation 탭에서 원하시는 항목에 "Required" 체크를 해주세요. example의 경우 성함, 전화번호, 금융 상품이 required로 되어있습니다.
        
![Screen Shot 2018-08-07 at 4.18.08 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.18.08%20PM.png)

e. Pane2에 1개의 component를 추가 해 주세요. Pane2는 화면을 닫기전에 나올 페이지 입니다. 

![Screen Shot 2018-08-07 at 4.36.06 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.36.06%20PM.png)

f. 이제  event를 추가 해 줄 것입니다. 

![Screen Shot 2018-08-07 at 4.37.14 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.37.14%20PM.png)

g. 두가지 이벤트를 추가해 주세요. Exit to Bot과 Activate and Show Pane 이벤트를 추가해 각각 인포메이션을 보이는 것처럼 넣어주세요. 

![Screen Shot 2018-08-07 at 4.37.24 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.37.24%20PM.png)

h. 모두 완료 되었습니다!

### B. 인스턴트 앱을 불러오기
=======

a. New Instant App -> Import an instant app을 눌러주세요. 

![Screen Shot 2018-08-07 at 3.59.43 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%203.59.43%20PM.png)
![Screen Shot 2018-08-07 at 4.08.10 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.08.10%20PM.png)

b. AgreementInstantApp.json을 drag and drop 해 주세요.

c. App Settings의 ID가 AgreementInstantApp 인지 확인 해주세요. 

![Screen Shot 2018-08-07 at 4.10.17 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%204.10.17%20PM.png)

**Step 3: Instant App으로 들어가기**
=======

### 1. Flow 를 넣어서 테스트를 해 볼 수 있습니다. 

![Screen Shot 2018-08-07 at 5.35.35 P](media/15336223095314/Screen%20Shot%202018-08-07%20at%205.35.35%20PM.png)



