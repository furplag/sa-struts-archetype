<%@page pageEncoding="UTF-8"%><%-- indent:2 --%>
  <%-- Footer Content Here. --%>
<c:if test="${dollar}{not empty loginuserDto}">
  <ul>
    <li>${dollar}{loginuserDto.os}</li>
    <li>${dollar}{loginuserDto.category}</li>
    <li>${dollar}{loginuserDto.browserName}</li>
    <li>${dollar}{loginuserDto.browserVersion}</li>
  </ul>
</c:if>
