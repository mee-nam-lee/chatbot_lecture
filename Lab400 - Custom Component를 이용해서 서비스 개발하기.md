Lab400 - Custom Component를 이용해서 서비스 개발하기
=======

이 랩에서는 앞에서 추가한 Intent : InvestPlan에 Business Logic을 추가해서 답변을 해 보도록 하겠습니다. 서비스를 nodejs로 개발해서, Mobile Cloud에 올려서 테스트 해 볼 예정입니다. 

이 랩을 하기전에 필요한 항목을 확인하세요. labfiles/에서 아래의 폴더들이 있는지 확인해주세요.
-   ome-tools
-   mobile-API
-   code/flow_lab_400.txt


**Step 1: 만들어져 있는 API TEST하기**
=======

### 1. TEST 
원하시는 봇에 접속해서 연결 되어있는 서비스 메세지를 확인해 봅니다. 버그를 확인했습니다.

![Screen Shot 2018-04-24 at 1.50.21 P](media/15245452829241/Screen%20Shot%202018-04-24%20at%201.50.21%20PM.png)

**Step 2: Flow를 수정해서 서비스 부르도록 하기**
=======
### 1. InvestPlan이라는 intent가 들어오면, 서비스에서 답변 할 수 있도록 Flow를 수정하겠습니다. 먼저 가능한 서비스가 무엇이 있는지 확인 해 주세요. 

![Screen Shot 2018-08-07 at 2.52.16 P](media/15336165729713/Screen%20Shot%202018-08-07%20at%202.52.16%20PM.png)

### 2. InvestPlan이라는 서비스를 부를 것 입니다. 이 서비스에 필요한 variable은 무엇인지, 가능한 action은 무엇인지 확인합니다. 
![Screen Shot 2018-08-07 at 2.53.38 P](media/15336165729713/Screen%20Shot%202018-08-07%20at%202.53.38%20PM.png)


### 3. flow_lab_400.txt 을 복사해서 붙여 넣어주세요. 변경되는 부분은 StartPlan이라는 부분입니다. 
![Screen Shot 2018-08-07 at 2.47.07 P](media/15336165729713/Screen%20Shot%202018-08-07%20at%202.47.07%20PM.png)


**Step 3: OMCe Tool을 이용해 Local의 변경사항 바로 deploy 및 Test 하기**
=======

### 1.  mobile-API/bankingcc 폴더로 이동해서 사용하실 MCS Backend와 configuration 정보가 모두 일치하는지 확인합니다. toolsConfig.js 파일과 사용하시려는 MCS MBE setting과 대조하시면 됩니다. 

![Screen Shot 2018-04-19 at 12.46.23 P](media/15159994715262/Screen%20Shot%202018-04-19%20at%2012.46.23%20PM.png)


    "apiName":"OracleMobileAPI",
    "apiVersion":"1.0",
    "apiId":"[YOUR APPID]",
    "baseUrl":"https://OOOOOOO.uscom-central-1.oraclecloud.com:443",
    "tokenEndpoint":"https://idcs-OOOOOOO.identity.oraclecloud.com/oauth2/v1/token",
    "backend":{
        "backendId":"[YOUR BACKEND ID]",
        "backendName":"chatbot",
        "backendVersion":"1.0",
        "authorization":{
		"anonymousKey":"[YOUR TOKEN]",
            	"clientId":"[YOUR ID]",
            	"clientSecret":"[YOUR SECRET]"
        }
    }

### 2.  mobile-API/bankingcc 폴더에서 node_modules 폴더가 보이지 않는다면 이동해서, 아래 커맨드를 쳐주세요. 

		npm install 

### 3.  mobile-API/bankingcc에 필요한 package가 모두 설치 되었으므로, api implementation을 수정합니다. 아래처럼 banking/investPlan.js를 수정해 주세요.

![Screen Shot 2018-08-07 at 3.06.47 P](media/15336165729713/Screen%20Shot%202018-08-07%20at%203.06.47%20PM.png)

    이 부분의 outputMsg를 REST API를 호출해서 실제 정보를 받아올 수 있습니다. 
    주석을 풀어서 간단히 만들어 보거나, 여러가지로 수정을 해볼 수 있습니다. 
    
![Screen Shot 2018-08-07 at 3.00.47 P](media/15336165729713/Screen%20Shot%202018-08-07%20at%203.00.47%20PM.png)

    conversation.reply() <- stack에 답장할 메세지를 넣어두기
    conversation.transition() <- 다음 state로 넘어가기
    done() <- stack에 있는 모든 메세지를 유저에게 주고 현재 state 를 끝내기 
    
    위의 method들은, 유저에게 답장을 한 후 현재 state에서 머무르거나, 유저에게 받아온 여러개의 답장을 이용해서 한개의 새로운 답변을 주는등 높은 확장성을 위해 제공되는 method 들 입니다.  


### 4. omce-tools/omce-tools에서 아래의 커맨드로 수정사항을 deploy합니다. 

	node omce-deploy ../../mobile-API/bankingCC/toolsConfig.json -u {mcs_user_name} -p {mcs_password}


아래와 같은 메세지가 나오면 성공적으로 deploy 한 것입니다. 

Warning: Configuration property "proxy" is undefined

To display help and examples associated with warnings, use the --verbose option
Requesting OAuth token...
Packaging implementation for BankingCC v1.0 from /Users/sunghyejeon/Documents/ChatBot_Handson/labfiles/mobile-API/bankingcc/
Deploying implementation to OMCe
Deployment completed successfully


### 5.  Test하기 

response가 바뀐 것을 확인 하실 수 있습니다.

![Screen Shot 2018-08-07 at 3.11.17 P](media/15336165729713/Screen%20Shot%202018-08-07%20at%203.11.17%20PM.png)

