// Initialize the multilingual library with configuration
Multilingual.init({
    autoWrap: true,
    autoWrapSelector: 'body',
    cssClasses: {
        useShortNames: true
    }
});

// Cell division pie chart animation
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.querySelector('.overlay');
  var duration = 5000; // 더 빠르게 (30초 → 15초)
  var currentState = 1;
  var cycleStartTime = Date.now();
  
  function createSVG(index, total) {
    var centerX = 500;
    var centerY = 500;
    var radius = 499.5;
    var strokeWidth = 0.75;
    var isPortrait = window.innerWidth < window.innerHeight;
    var svgWidth, svgHeight, floatStyle;
    
    if (total === 1) {
      svgWidth = '100%';
      svgHeight = '100%';
      floatStyle = 'none';
    } else if (total === 2) {
      if (isPortrait) {
        svgWidth = '100%';
        svgHeight = '50%';
        floatStyle = 'none';
      } else {
        svgWidth = '50%';
        svgHeight = '100%';
        floatStyle = 'left';
      }
    } else if (total === 4) {
      if (isPortrait) {
        svgWidth = '100%';
        svgHeight = '25%';
        floatStyle = 'none';
      } else {
        svgWidth = '25%';
        svgHeight = '100%';
        floatStyle = 'left';
      }
    } else if (total === 8) {
      if (isPortrait) {
        svgWidth = '100%';
        svgHeight = '12.5%';
        floatStyle = 'none';
      } else {
        svgWidth = '12.5%';
        svgHeight = '100%';
        floatStyle = 'left';
      }
    } else if (total === 16) {
      if (isPortrait) {
        svgWidth = '100%';
        svgHeight = '6.25%';
        floatStyle = 'none';
      } else {
        svgWidth = '6.25%';
        svgHeight = '100%';
        floatStyle = 'left';
      }
    }
    
    return `
      <svg class="cell-svg" style="width: ${svgWidth}; height: ${svgHeight}; float: ${floatStyle};" 
           viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="gray" stroke-width="${strokeWidth}" fill="transparent" vector-effect="non-scaling-stroke"/>
        <path class="pie-path" d="M ${centerX} ${centerY} L ${centerX} ${centerY - radius} A ${radius} ${radius} 0 0 1 ${centerX} ${centerY - radius} Z" 
              fill="transparent" stroke="gray" stroke-width="${strokeWidth}" vector-effect="non-scaling-stroke" />
      </svg>
    `;
  }
  
  function createPiePath(angle) {
    var centerX = 500;
    var centerY = 500;
    var radius = 499.5;
    // 반시계 방향: -angle 사용
    var radians = (-angle - 90) * Math.PI / 180;
    var endX = centerX + radius * Math.cos(radians);
    var endY = centerY + radius * Math.sin(radians);
    var largeArcFlag = angle > 180 ? 1 : 0;
    
    if (angle === 0) {
      return `M ${centerX} ${centerY} L ${centerX} ${centerY - radius} A ${radius} ${radius} 0 0 0 ${centerX} ${centerY - radius} Z`;
    } else if (angle >= 360) {
      return `M ${centerX} ${centerY} L ${centerX} ${centerY - radius} A ${radius} ${radius} 0 1 0 ${centerX + 0.01} ${centerY - radius} Z`;
    } else {
      return `M ${centerX} ${centerY} L ${centerX} ${centerY - radius} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY} Z`;
    }
  }
  
  function updateSVGs(count) {
    var svgHTML = '';
    for (var i = 0; i < count; i++) {
      svgHTML += createSVG(i, count);
    }
    overlay.innerHTML = svgHTML;
    currentState = count;
    cycleStartTime = Date.now();
  }
  
  function isMobile() {
    return window.innerWidth < 640;
  }
  
  window.addEventListener('resize', function() {
    updateSVGs(currentState); // 현재 상태 유지하며 레이아웃만 업데이트
  });
  
  function animateCells() {
    var currentTime = Date.now();
    var elapsed = currentTime - cycleStartTime;
    var progress = (elapsed % duration) / duration;
    var currentAngle = progress * 360;
    var isPortrait = window.innerWidth < window.innerHeight;
    
    var piePaths = document.querySelectorAll('.pie-path');
    piePaths.forEach(function(path) {
      path.setAttribute('d', createPiePath(currentAngle));
    });
    
    if (elapsed >= duration) {
      if (isPortrait) {
        var isMobileView = isMobile();
        if (isMobileView) {
          if (currentState === 4) updateSVGs(8);
          else if (currentState === 8) updateSVGs(16);
          else if (currentState === 16) updateSVGs(4);
        } else {
          if (currentState === 2) updateSVGs(4);
          else if (currentState === 4) updateSVGs(8);
          else if (currentState === 8) updateSVGs(2);
        }
      } else {
        // Landscape sequence: 1 → 2 → 4 → 8 → 16 → 1
        if (currentState === 1) updateSVGs(2);
        else if (currentState === 2) updateSVGs(4);
        else if (currentState === 4) updateSVGs(8);
        else if (currentState === 8) updateSVGs(16);
        else if (currentState === 16) updateSVGs(1);
      }
    }
    
    requestAnimationFrame(animateCells);
  }
  
  var isPortrait = window.innerWidth < window.innerHeight;
  var isMobileView = isMobile();
  
  if (isPortrait && isMobileView) updateSVGs(4);
  else if (isPortrait) updateSVGs(2);
  else updateSVGs(1);
  
  animateCells();
});

// Adobe typekit loader
(function(d) {
  var config = {
    kitId: 'oqy0col',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
