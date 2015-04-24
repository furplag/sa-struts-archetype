<%@page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="ja"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<c:if test="${dollar}{loginuserDto.browserName == 'internetexplorer'}">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
</c:if>
#if ($noJS.matches("(?i)no?|f(alse)?|off"))##
<noscript>
<meta http-equiv="Refresh" content="0;URL=${dollar}{f:url('/fatal/noscript')}">
</noscript>
#end##
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1">
<c:choose>
<c:when test="${dollar}{not empty param.title}">
<title>${dollar}{prop:get_d('param', 'self', fn:replace(pageContext.request.contextPath, '/', ''))} - ${dollar}{param.title}</title>
</c:when>
<c:otherwise>
<title>${dollar}{prop:get_d('param', 'self', fn:replace(pageContext.request.contextPath, '/', ''))}</title>
</c:otherwise>
</c:choose>
#if ($noJS.matches("(?i)no?|f(alse)?|off"))##
#if ($bootstrap.matches("(?i)y(es)?|t(rue)?|on"))##
<link rel="stylesheet" href="${dollar}{f:url('/libs/css/bootstrap.min.css')}">
#end##
#end##
<link rel="stylesheet" href="${dollar}{f:url('/css/${artifactId}.min.css')}">
#if ($noJS.matches("(?i)no?|f(alse)?|off"))##
#if ($modernizr.matches("(?i)y(es)?|t(rue)?|on"))##
<script src="${dollar}{f:url('/libs/js/modernizr.min.js')}"></script>
<!--[if lt IE 9]>
  <script src="${dollar}{f:url('/libs/js/html5shiv.min.js')}"></script>
  <script src="${dollar}{f:url('/libs/js/respond.min.js')}"></script>
  <link href="${dollar}{f:url('/libs/js/respond-proxy.html')}" id="respond-proxy" rel="respond-proxy" />
  <link href="${dollar}{f:url('/libs/js/respond.proxy.gif')}" id="respond-redirect" rel="respond-redirect" />
  <script src="${dollar}{f:url('/libs/js/respond.proxy.min.js')}"></script>
<![endif]-->
#end##
#end##
</head>
<body>
<c:import url="/WEB-INF/view/_common/header.jsp" />
  <main class="content-shell" role="main">
    <div class="container" id="content">
<c:import url="/WEB-INF/view/_common/nav.jsp" />
${dollar}{param.content}
    </div>
  </main>
<c:import url="/WEB-INF/view/_common/footer.jsp" />
#if ($noJS.matches("(?i)no?|f(alse)?|off"))##
#if ($jquery.matches("(?i)y(es)?|t(rue)?|on"))##
<c:choose>
<c:when test="${dollar}{empty loginuserDto}">
<script type="text/javascript" src="${dollar}{f:url('/libs/js/jquery-1x/jquery.min.js')}"></script>
</c:when>
<c:when test="${dollar}{loginuserDto.jqueryLegacy}">
<script type="text/javascript" src="${dollar}{f:url('/libs/js/jquery-1x/jquery.min.js')}"></script>
</c:when>
<c:otherwise>
<script src="${dollar}{f:url('/libs/js/jquery.min.js')}"></script>
</c:otherwise>
</c:choose>
<script src="${dollar}{f:url('/libs/js/jquery-jsonp.js')}"></script>
#end##
#if ($sessionResuscitate.matches("(?i)y(es)?|t(rue)?|on"))##
<c:if test="${dollar}{not empty loginuserDto && loginuserDto.authenticated}">
<script>
  $(function () {setTimeOut(function () {${dollar}.get('$f:url('/resuscitate')}')}, (${dollar}{extensions:getIntervalSecond} - 300))})
</script>
</c:if>
#end##
#if ($bootstrap.matches("(?i)y(es)?|t(rue)?|on"))##
<script src="${dollar}{f:url('/libs/js/bootstrap.min.js')}"></script>
#end##
<script src="${dollar}{f:url('/js/${artifactId}.min.js')}"></script>
#end##
</body>
</html>
