Lab200 - Training Data를 사용해 Chatbot을 Train
=======

이 랩에서는 간단한 금융 봇에 새로운 인텐트를 테스트하여 작동 원리를 배울 것입니다. LAB100에서 본 챗봇을 어떻게 교육 시키는지 어떻게 비지니스 플로우를 정의 하는지를 알아 볼 것입니다. 아래의 네가지 항목은 이번 랩에서 배울 것입니다.
1.  Intent
2.  Utterances
3.  Flow

이 랩을 하기전에 필요한 항목을 확인하세요. labfiles/code에서 아래의 파일들이 있는지 확인해주세요.
-   flow_lab_200.txt


**Step 1: 챗봇에서 intent, flow 만들기**
=======

이 섹션에서는 utterances를 추가함으써, 2가지 intent를 생성 할 것입니다. 후에, 비지니스 로직을 flow에서 정의 할 것입니다. 이렇게 만들어진 챗봇을 테스트 해 보겠습니다.

### 1.  초록색 버튼으로 intent를 추가해 주세요.

![Screen Shot 2018-08-03 at 5.24.59 P](media/15332828444147/Screen%20Shot%202018-08-03%20at%205.24.59%20PM.png)


그림과 같이 InvestPlan과 NearBy이라는 intent를 알 수 있게 example utterances를 넣음으로써 봇을 교육 시켜 주세요.

        원하시는 문장을 넣어주셔도 좋습니다. 최소 2문장 이상으로 Bot을 교육 시켜주세요.

![Screen Shot 2018-08-03 at 5.28.45 P](media/15332828444147/Screen%20Shot%202018-08-03%20at%205.28.45%20PM.png)
![Screen Shot 2018-08-03 at 5.28.31 P](media/15332828444147/Screen%20Shot%202018-08-03%20at%205.28.31%20PM.png)

### 2. 오른쪽 상단의 Train버튼으로 Bot을 교육시켜주세요.

![Screen Shot 2018-08-03 at 5.33.58 P](media/15332828444147/Screen%20Shot%202018-08-03%20at%205.33.58%20PM.png)

![Screen Shot 2018-08-03 at 5.35.36 P](media/15332828444147/Screen%20Shot%202018-08-03%20at%205.35.36%20PM.png)


### 3. labfiles 폴더 안에 있는 flow_lab_200.txt을 열어서 Flow에 알맞게 넣어주세요.

![Screen Shot 2018-08-06 at 5.35.27 P](media/15332828444147/Screen%20Shot%202018-08-06%20at%205.35.27%20PM.png)


### 4.  현재까지 example utterances를 이용해 2개의 intent를 추가 했습니다. 또한 이 intent에서 대화가 어떻게 흘러갈지 flow를 정의했습니다. 재생 버튼을 눌러서 봇을 Test 해 보겠습니다. intent 감지가 정상동작하는지 확인합니다. 또한, 탭을 옮겨서 그럼 flow도 확인 해 주세요.


![Screen Shot 2018-08-06 at 5.42.06 P](media/15332828444147/Screen%20Shot%202018-08-06%20at%205.42.06%20PM.png)


    탭을 바꿔서 확인해 보세요. 

![Screen Shot 2018-08-07 at 11.00.55 A](media/15332828444147/Screen%20Shot%202018-08-07%20at%2011.00.55%20AM.png)

