# 참고 - PizzaBot 전체 Flow

```yaml
metadata:
  platformVersion: "1.1"
main: true
name: "CrcPizzaBot"
context:
  variables:
    iresult: "nlpresult"
    pizzas: "string"
    dummy: "string"
    orderedPizza: "string"
    orderedPizzaImage: "string"
    pizzaSize: "PizzaSize"
    location: "string"
    cardsRangeStart: "int"
defaultTransitions:
  error: "DefaultErrorHandler"
  actions:
    unexpectedAction: "HandleUnexpectedAction"
states:
  setCardsRangeStart:
    component: "System.SetVariable"
    properties:
      variable: "cardsRangeStart"
      value: 0
    transitions: {}
  LoadPizzas:
    component: "System.SetVariable"
    properties:
      variable: "pizzas"
      value:
      - name: "CHEESE"
        description: "모짜렐라 치즈와 이탈리안 소스를 토핑한 클래식 피자"
        image: "https://cdn.pixabay.com/photo/2017/09/03/10/35/pizza-2709845__340.jpg"
      - name: "PEPPERONI"
        description: "고전 스타일의 페파로니와 클래식 마리나라 소스를 토핑한 피자"
        image: "https://cdn.pixabay.com/photo/2017/08/02/12/38/pepperoni-2571392__340.jpg"
      - name: "MEAT LOVER"
        description: "고전적인 마리나라 소스, 정통 스타일 페퍼로니, 자연산 이태리 소시지, 구운 햄, \
          \ 훈제 베이컨, 양념 된 돼지 고기 및 쇠고기"
        image: "https://cdn.pixabay.com/photo/2017/07/22/22/51/big-2530144__340.jpg"
      - name: "SUPREME"
        description: "고전적인 마리나라 소스, 정통 스타일 페퍼로니, 양념 된 돼지 고기, 쇠고기, 신선한 버섯, \
          \ 신선한 녹색 피망 및 신선한 붉은 양파"
        image: "https://cdn.pixabay.com/photo/2017/07/22/22/57/pizza-2530169__340.jpg"
      - name: "PREMIUM GARDEN VEGGIE"
        description: "프리미엄 토마토 소스, 피망, 붉은 양파, 버섯, 로마 토마토, 볶은 시금치, 바삭한 빵껍질"
        image: "https://cdn.pixabay.com/photo/2017/07/22/22/57/pizza-2530169__340.jpg"
      - name: "ULTIMATE CHEESE LOVER"
        description: "갈릭 파마산 소스와 구운 파르메산 크러스트, 50% 더 많은 모짜렐라 치즈 토핑"
        image: "https://cdn.pixabay.com/photo/2017/08/02/12/38/pepperoni-2571392__340.jpg"
      - name: "HAWAIIAN CHICKEN"
        description: "구운 닭고기, 햄, 파인애플, 녹색 피망"
        image: "https://cdn.pixabay.com/photo/2017/07/22/22/51/big-2530144__340.jpg"
      - name: "BACON SPINACH ALFREDO"
        description: "갈릭 파마산 소스, 베이컨, 버섯, 구운 시금치, 소금을 뿌린 프레즐 크러스트"
        image: "https://cdn.pixabay.com/photo/2017/09/03/10/35/pizza-2709845__340.jpg"
    transitions: {}

####### (1) Intent에 대한 Action을 추가 해야 해요
  Intent:
    component: "System.Intent"
    properties:
      variable: "iresult"
      confidenceThreshold : 0.8
    transitions:
      actions:
        unresolvedIntent: "Unresolved"
        # OrderPasta 추가
        OrderPasta : "OrderPasta"
        # OrderPizza 추가
        OrderPizza : "OrderPizza"

####### OrderPasta 단계를 아래에 복사헤 주세요
  OrderPasta:
    component: "System.CommonResponse"
    properties:
      metadata:
        responseItems:
        - type: "text"
          text: "죄송합니다. 오늘은 파스타가 없네요."
          name: "pasta"
      processUserMessage: false
    transitions:
      return: "done"

####### OrderPizza 단계를 아래에 복사헤 주세요

  OrderPizza:
    component: "System.CommonResponse"
    properties:
      metadata:
        responseItems:
        - type: "text"
          text: "오늘의 피자 입니다."
          separateBubbles: true
          visible:
            expression: "<#if cardsRangeStart?number == 0>true<#else>false</#if>"
          name: "Our pizzas"
        - type: "text"
          text: "더 많은 피자들이 있습니다."
          separateBubbles: true
          visible:
            expression: "<#if cardsRangeStart?number != 0>true<#else>false</#if>"
          name: "More pizzas"
        - type: "cards"
          cardLayout: "horizontal"
          name: "PizzaCards"
          actions:
          - label: "피자 더 보기"
            type: "postback"
            visible:
              expression: "<#if cardsRangeStart?number+4 < pizzas.value?size>true<#else>false</#if>"
            payload:
              action: "more"
              variables:
                cardsRangeStart: "${cardsRangeStart?number+4}"
            name: "More"
          cards:
          - title: "${pizzas.name}"
            description: "${pizzas.description}"
            imageUrl: "${pizzas.image}"
            name: "PizzaCard"
            iteratorVariable: "pizzas"
            rangeStart: "${cardsRangeStart}"
            rangeSize: "4"
            actions:
            - label: "지금 주문"
              type: "postback"
              payload:
                action: "order"
                variables:
                  orderedPizza: "${pizzas.name}"
                  orderedPizzaImage: "${pizzas.image}"
              name: "Order"
          channelCustomProperties:
          - channel: "facebook"
            properties:
              top_element_style: "large"
      processUserMessage: true
    transitions:
      actions:
        order: "AskPizzaSize"
        more: "OrderPizza"
        textReceived: "Intent"

####### AskPizzaSize 단계를 아래에 복사헤 주세요

  AskPizzaSize:
    component: "System.CommonResponse"
    properties:
      variable: "pizzaSize"
      nlpResultVariable: "iresult"
      maxPrompts: 2
      metadata:
        responseItems:
        - type: "text"
          text: "<#if system.invalidUserInput == 'true'>크기 선택이 잘못되었습니다. 다시 선택해 주세요.\
            \ </#if>어떤 크기의 피자를 원하십니까?"
          name: "What size"
          separateBubbles: true
          actions:
          - label: "${enumValue}"
            type: "postback"
            payload:
              action: ""
              variables:
                pizzaSize: "${enumValue}"
            name: "size"
            iteratorVariable: "pizzaSize.type.enumValues"
      processUserMessage: true
    transitions:
      actions:
        cancel: "Intent"
      next: "AskLocation"
      
####### AskLocation 단계를 아래에 복사헤 주세요

  AskLocation:
    component: "System.CommonResponse"
    properties:
      variable: "location"
      metadata:
        responseItems:
        - text: "어디로 배달해 드릴까요?"
          type: "text"
          name: "What location"
          separateBubbles: true
        globalActions:
        - label: "Send Location"
          type: "location"
          name: "SendLocation"
      processUserMessage: true
    transitions:
      actions:
        cancel: "Intent"
      next: "Confirmation"

####### Confirmation 단계를 아래에 복사헤 주세요

  Confirmation:
    component: "System.CommonResponse"
    properties:
      metadata:
        responseItems:
        - text: "주문해 주셔서 감사합니다. 주문하신 ${pizzaSize} ${orderedPizza} 피자가 30분 내로 배달될 예정입니다."
          type: "text"
          name: "conf"
          separateBubbles: true
        - type: "attachment"
          attachmentType: "image"
          name: "image"
          attachmentUrl: "${orderedPizzaImage}"
      processUserMessage: false
    transitions:
      return: "done"

####### ShowMenu ##########################      
  ShowMenu:
    component: "System.CommonResponse"
    properties:
      processUserMessage: true
      metadata:
        responseItems:
        - type: "text"
          text: "안녕하세요. 오늘의 메뉴입니다."
          name: "hello"
          separateBubbles: true
          actions:
          - label: "피자"
            type: "postback"
            payload:
              action: "pizza"
            name: "Pizzas"
          - label: "파스타"
            type: "postback"
            payload:
              action: "pasta"
            name: "Pastas"
    transitions:
      actions:
        pizza: "OrderPizza"
        pasta: "OrderPasta"
        textReceived: "Intent"

####### CancelPizza ########################## 

  CancelPizza:
    component: "System.Output"
    properties:
      text: "주문 취소는 아직 구현되지 않았어요, 다른 기능을 테스트 해 보세요"
    transitions:
      return: "done"
      
### 고객 의도(Intent)가 파악되지 않을때 답변하는 로직, 그대로 사용합니다.
  Unresolved:
    component: "System.CommonResponse"
    properties:
      metadata:
        responseItems:
        - type: "text"
          text: "죄송하지만 다시한번 말씀해 주시겠어요?"
          name: "Sorry"
          separateBubbles: true
      processUserMessage: false
    transitions:
      return: "done"
      
### 아래는 에러 처리 로직이니까 그대로 사용합니다.
  HandleUnexpectedAction:
    component: "System.Switch"
    properties:
      variable: "system.unexpectedAction"
      values:
      - "pizza"
      - "pasta"
      - "order"
    transitions:
      actions:
        NONE: "ActionNoLongerAvailable"
        pizza: "OrderPizza"
        pasta: "OrderPasta"
        order: "AskPizzaSize"
            
  ActionNoLongerAvailable:
    component: "System.Output"
    properties:
      text: "요청하신 Action이 더 이상 존재하지 않습니다. 다시 시도해 주세요."
    transitions:
      return: "done"
      
  DefaultErrorHandler:
    component: "System.Output"
    properties:
      text: "예상하지 않은 오류가 발생했습니다. 다시 시도하시거나, 헬프데스크에 문의하세요."
    transitions:
      return: "done"
      
### End of Flow ###################     
``