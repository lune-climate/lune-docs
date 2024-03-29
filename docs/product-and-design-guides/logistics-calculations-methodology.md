---
hide_table_of_contents: true
sidebar_position: 4
title: Logistics calculations methodology
---

<head>
<meta property="og:image" content="https://docs.lune.co/img/glec-accreditation.png" />
<meta property="twitter:image" content="https://docs.lune.co/img/glec-accreditation.png" />
</head>

import LoginWall from '@site/src/components/LoginWall';
import Gated, { GatedMarkdown } from '@site/src/components/Gated';
import LoginSink from '@site/src/components/LoginSink';
import { ApiReferenceSection, Markdown } from 'lune-ui-lib'
import { Box } from '@mui/material'
import ReactMarkdown from 'react-markdown'

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Industry standard accreditation

Lune’s calculations are based on the leading international standard for logistics emissions calculations, the [GLEC Framework](https://www.smartfreightcentre.org/en/our-programs/global-logistics-emissions-council/calculate-report-glec-framework/).

GLEC is a program developed by the [Smart Freight Centre](https://www.smartfreightcentre.org/) to offer a harmonised, efficient, and transparent way to calculate and report logistics emissions.

Lune’s methodology has been audited and accredited by the [Smart Freight Centre](https://www.smartfreightcentre.org/) and is compliant with ISO 14083.

</div>
</div>

<>

![glec-accreditation](/img/glec-accreditation.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Overview: how we calculate emissions

Shipment CO₂ emissions are calculated – with the highest feasible degree of accuracy – based on how much was shipped, how far, and how.

Lune needs to know three things:

1. **Shipment method** – what was used to move the goods
2. **Route or distance** – how far were they moved
3. **Cargo weight** – how much was moved

The following formula is then applied:

`Shipment Method’s Emission Factor` × `Distance` × `Cargo weight`

Each of these data points needs to be provided or calculated, let’s see below how it works, one by one.

</div>
</div>

<>

![how-we-calculate-emissions](/img/how-we-calculate-emissions.png)

</>

</ApiReferenceSection>

<LoginWall>
<ApiReferenceSection>

<div className="paragraphSections">

<div>

## 1. Shipment method

Lune covers all modes of transport including ocean, inland waterways, road, air, and rail. In addition, you can also calculate warehouse-related emissions.

Depending on the data you have available, the shipment method used for the calculation can be either high-level or more granular. For high-level data (e.g. if you only know the shipment was using a truck or a container ship), we use industry average [Emission Factors](/product-and-design-guides/emission-factors) by the GLEC Framework.

More granular information, such as vessel ID, vessel / vehicle size, fuel type, refrigeration, location and more, can be used to increase the accuracy of the calculation.

Based on the above, Lune matches the shipment method to the best [Emission Factor](/product-and-design-guides/emission-factors).

</div>
</div>

<>

![shipment-method](/img/shipment-method.png)

</>

</ApiReferenceSection>
</LoginWall>

<LoginSink>
<ApiReferenceSection>

<div className="paragraphSections">

<div>

<GatedMarkdown>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</GatedMarkdown>

</div>
</div>

<>

![maritime-transport](/img/maritime-transport.png)

</>

</ApiReferenceSection>
</LoginSink>

<LoginSink>
<ApiReferenceSection>

<div className="paragraphSections">

<div>

<GatedMarkdown>fsUy+Muv/S4wLNrm5463VdRS5bCzVBrKOK2Wb+PEU/+3o7R8cVjmRtLUCKMXawsF0BbAerW7roHtO9RppPYLajFYje6QR7y6FhXf+RalAAdBd/vjLBoKCISo5RSd9/B9j4Pg0fMayoQy1RIneSdykwtwB8QAFxwav9lb82Th09GqFd4/2t0p1VrqlOMz6u/Q8eF83iyTJrKzfmfBMePz4hS+ySiii8wcAtlRj9yqVwrPokvRI91ab8xb5bUPhTfb8jN5eBsoI0y4eH/v+8HslePmlNhFZmh8T1Bls1wiEAXK8nxoeJcrtEUp9PGO+6WkHZchZKGzhf/d5enshvL4ICLWHL6NzuPlKEMaHP2AFy+ODP9B+bnLbWqjUujtgS+Pv+4IK5TNl5ew+s/iE0nA19dqaxEOYL+kWzk6k0wQ4azc9F/YApr05U4adOk/bz/dfRI+BwYxRYV5vrFsdWukxic0TyjmK8vm23spMnmKxfODX7BJX7kzJ1gU3qAQRXbE5lQ+jf4bNU/4cEAr5dZCyqO58IwaxttREbwvv5YpjFON60y926+TjSvNrz+h7xJWIVpE+9amui2sFYqQZKE6a8ZnvWcAKMvKPVVsnoo28/2fBCCf8ieCX4o438g5sBapHShchWG/6uHm1ni6uzZ576pvimARfU08F3i55A7CH5hOjKkPvChaegn5PIgFRpvQCjVQJdRCCTPUKWOATF6pnm1p0CXfk5Sd6P9SAilejVmxOKDJrj24w/iJyA1vsEKAO8yLIdAj4hWnIdyVOwYbSZrdqWuHCYNJp1OxUB9fXnT/5+ioYWEXMm0rGBYJ/YRgCXQI</GatedMarkdown>

</div>
</div>

<>

![inland-waterways](/img/inland-waterways.png)

</>

</ApiReferenceSection>
</LoginSink>

<LoginSink>
<ApiReferenceSection>

<div className="paragraphSections">

<div>

<GatedMarkdown>fsUy8MyxvDQmbcP044S3Vr8hwv/nRRrIKKiVfOOrecqx8fdpb1r9WcPPH/deYAoNzQGJYrq859PuMsg6w848SH9tj+CPVuuwCReM7BCmAhsaJKjiJxcKMr7J0zTPwsU/mdW2lb4c0YIr3gQ4OmBor097BtwREE9a/t0M5TjtksGkVdRt35M531C+nuNn//TGtOF2gXiAcLClMDTUI7758UGzmWqw1ddNCbVsx53UXU6S5g6QacdIfsEFu+VR2WGFqEwhdQ0oNQKrdWysuJbu1rPtgNFadgwkXlk03BEGDALM7zI+W4U7pUYohfnM7rOiDI9iOLTnCRtjsL2vgrX5f2WSRerYX0wTdxpZX+DlUyKlAuha5OvOITm0UvT7w2uQ/vMBbtKJz8Pt48/hBAeVk4966P/5c+79GS5h+ABEgrfQ9FaTbLCUqQNMXfwlKH+Ya0256fJ0Fboe0NIwMFXxwScwXyjRLMCwx2pqYH6C1r+bF/0ZTKYyYFIPk/REBjPWq1ktmrkbKw+BKQkU/tYK36Lrk4gZkNVaWLwyqJ0kjF3IpxDo5LLdimTZqHr571ITZh9Duv+Esjf2bMnfWvQPYsB38lYcG5WKNAsjlp4n4LXeQjTH5SrRVII3ho9n+UTsDGZLj22/sIKjmAG9tD5o8vhqxjMGfVEqczbwyQaMBJcHhKAU+zZLKR71I49ICJXQVFYvYtQ5UG2WMGriBwuG0WVx2CvZgtyd8v9SAmxGlhT/dPCX+Wioy6LX90pm9w3EEdaIddkr+Rz1Z8aZLx0KH8nApTjYTBGlUQS9BEABCHDrnsg2lrnEJFke9UZw0LfMvQRPY2tEZw+ogDXSCEKnXU4rX3EQthz/3SKWlMTaXUc9UZpGjrXjT1G+Jb6oIj5wYIKRUTOX87piH+LN5XqSy87oW2zrNSYi0KEzpfGY9rMh1WP4cATPrHHXiolcHZfjBLtL+QnL+qCm7Shzmtf1vjLOBJ7i4a+h1IWOW/kfi6+WkoWFz37f+mTVJJ2ulKEvpM+wc/D03YzZtYwkCWkbaQRYj2PnBBMfRmivDfglwqpfgY8SiwOUTXF5ELW+glEvlGKP05uNtXpIwNWoFJ6ia51BqJwgRw8Yiqk+INa0bol0fmKf8+zNjhrugLyHj3E=</GatedMarkdown>

</div>
</div>

<>

![air-transport](/img/air-transport.png)

</>

</ApiReferenceSection>
</LoginSink>

<LoginSink>
<ApiReferenceSection>

<div className="paragraphSections">
<div>

<GatedMarkdown>fsUy48qi+GAgfszp4JuqUMEhnMSoBhjFJ76Mcfa6PIuq7LZ5PU/hS93THewMcUcB0xuTfr2gpYC2etp/pPcKbn9ZmOaLXPK+F74M0TqnBwcePuf4bzRLCoPn9QayuP1625L9j/xWwYUnyUU4IGl03AR8XdgTDBEAst5W83jg3tGgCNJ41pE9xVeunv48++rcouZswSeeL7XwfG3AMa9dYhex3m21wtkXGKczwNyRXRbJswfCZtpQesUE6eYVkjObvnUkcRJ7JBW8dTKhupe42K/mh5xUMDkvTxYdt3ZlPgKF4Xx6eII5pEUu9PGv66+oSI9yKeqmAxYrp72wy7TiN27HW+fJREMfdBdfX/34RC+iFe5c6v7YKHW/VuC+y26AqvMdbtWLwoTg+p/5GEmAkok04P/6c+n9DDhh/BUcgrTB7VDVRt7e7EYJabAoKmeJJUW16fIgEt4048kzNlDxwTYhTijEKsGwx2t/dybHxv6cGvwZRaR7c1Ien5N8KxXWgEQ+kvwJKRSZdGpxs4YJj4LswYwE1ZgIfMwDmd5guFjfql+phOfggDHYsz/LokMJfRlHkK6NqjDgP9PFRKQmcddwvUVPKMjIJhw+0oQitPzWSjaP8yrMScUvyoYy8U7tXz1cl2en45+1hkmo9Txy+apqhmkHaxtFF3+54ATCDotOgewL/TAfIRb5I4gJEp7UAHwWZsFKTG2KKi/5RjmYnnBukRrUno/e8v8BJilbmR3lfcuW6R/9hazIlANmzxrCGc3FfYJkuZJVkp3efVUKSoef7HvIO6Vy6z28EzdURn70/YE2l5H8Y1FBugb+cEKS5ENTeD8KbxP6okPxSSnkXTpiBiRS/xSyn2/jl8+bfkE5V8gV2OG3VEagJceCKR1JLKjPBBGO+6FyTLbL53bZhZevECq/em8igPo15qzZovdv/0byYnHa/jmYmctEdtSmZeFZ4g/X8amm7T565I+gjTiHV8i48ur81MHSTrdVi7PAg8nGlmiJ/CGTY8LoyaEPp7n9OND02JaR5aEoAn54ADA87kH9HRgfQG66Drc2lq4aicgUiguSCGIvGqH/gV1pnWHd9ZSL8mMJz5utWqrjbJxRpZBlQVYYg7twJMv+RJ8sA4SJPn+tNEOtYColH7am7aJ9pIHc5N/+fIqCMuHgDewhc8rjcKYc1OZ6+QUH6mOZfO4z44KfxwWLPMeDHH4j+pPy3ekF/DPlWPKTLpamXtKhfR8U5lKSKL8AqwQIiuaCNKoqajH5iZ2PzKYOQ4uoKWEOMsBi1CzGZVxecfxRmKLhehUzdMJtimtl6g9JFTbLqYYuQVtL+fdTbFImRf8h9/48z3jjLvaSIoYYUuOCtPapPA8n+i8hP3EQTK8x05rbb4GH4k6DtsXtkrwP19B6b4CCsx48ZjStsoUGwsDrzlVuYXLSuxC30cA/7Pu8BnL9u9HJWYyNeLhthdMM+ma7kVGyCRsBuXL/el3oLhAkR//F7r/xoatcaBVyY6TOajjRCJB4F/afS0Ea3qhnYWH5cba9RvUJG2pmxnvKySIb54CokjQ3ggd5alx2tnUCHwuS+iSJPoEwaO+++i3GUKjhRwt7rbV9SE88H9wx2JP22qrvP8E1dLBqfk6CoQRjXZ8t/+vP7wf6J0UY1nq52FAmiTOJK51C49L1nxjS0NH0qggQ+v7GEYps9LnZq3ZhXrPet7PcOTPLGshEncDO7VkfDH/+BmDMIzNBRQqZSnkbplmMEM2Avlyy+d3fMhtAh4WHy8iXs2iZea+DTIMbS1phr/t26LmnOQQmdAOJk9h6OaMwPU1Bichbm3IgOMYFfiw9sH8RghOLIYt4YTWdTrayCMbZZF3p0E1b</GatedMarkdown>




</div>
</div>

<>

![road-transport-europe](/img/road-transport-europe.png)

![rood-transport-north-america](/img/road-transport-north-america.png)

</>

</ApiReferenceSection>
</LoginSink>

<LoginSink>
<ApiReferenceSection>

<div className="paragraphSections">
<div>

<GatedMarkdown>fsUy48Sq8GAgfszp4JuqUMEhnMSoBhjFJ76Mcfa6PIuq4r5xPU/hS93THewMcUcB0xuTfr2gpYC2etp/pPcKbn9fiu7CV/W5HRne7xG+ThkII+D5KwEGSZPt9xCB9PxgyMLh2/MOzY8w0g4mdXN5l0dnAMkIDVUcoooaqByO3pWBEt5s3dB6xEyrkuMZs6fwvfBm2jvaKvTnemPbLIyV4VbzjUy4h8UcVPMv152OVg2q2i3INI5NY8VbrPlcnCTW930iNDIuPgnsf3jnvouvOmPSo5UdJSslVBdP3x0MCx7X8wE2dZAsoVpg9/6H8aK+RpZ0IvyoBBBhpKqzj6f0Ji+GQuqQSAYFcxREAe7/VGumEKRL5vDOe3C/Wan4zGyXse4cZ3ZFwMv3t6HiEx2ax6Y37OP0MO76Syxl/BRRxaaFpHbIFNXH70ECO/E6KmWNLETwp/RzXcdx+9dmNEjx8DojRHjAJcuw0mNmZmWV17+JEOoZS+otZkgS2qBJTjmQ5lUwkvQRIg+GMwUIsNFYzqnqw4wGxNFMHbQn9JVu2V3FplGhy6bfnGiMuHDrowZdNAlS/8Gt837metLVVbg6L4Nm6UdGaLevZ1pv0q4o8fvLXjmJoTvQXIw32OIY1k/7XyxCh2e4sYKv1liptDRy7qpuijMBeU0saD740wRuy6Jij6UO7zdQZ1raMZhdCYTGM3RNPIAaSzjLay7lBQ3EnXZz1GLSmcnN7PVFBC9G0xT/MOzfrCvxjKeXmhUv3g3TV8aIPMI55R+7LMyRKwERV5rYS6iKBckvyBqxcBFdS27q9ZZ/tLGKNxETtEF5l7jPuoGnjiJEbw6/l3LfQE6gBV1CBShT5R79uQjz1oSOc1xjEopGm6SnG0egYNWCHS5qJc2EBCeC+qljALaZ9HTRy9jqTT+tNTIi0qcgqq/Z96Zo/wi8NGfBt3qVyJhDGZ2mQf9I6BjQ9Ku7/CN64I+6iibeA5Lj6MD+1LiXVuMT2+uN152B3y2Z6nicN52/ncpz4ei/f/u73pCYrI5lAmB0ACVEjW7hBwQfRmirGb1O6P4Zy8g9mgmXH3F/Hb7V73Z222DK9puKvmFI7c6iUe6qdohBtIhlQUcNxqQ/JsTuDYMrWYOPcFXSagaJcmRmVuS1ovt64quSrPf0YYrQIP2lGvcyaYGeNeMpyfdn+TIJuGSDfLxY7veIlQuAFq/2eXIh/p71iekMn222d/GcepKiWazjL3lRwnHLbZActBxryKi9QIBrJmXSiZeP+aYOacTtXVhdeIQGwDqUE29VCKVRuq25SB5LNYYMxW1p9kgEdFPY6KM3QVFLhLUBVRlKPbVlsawR1HzjLtH0HoRddP+Rt++2OAUNo30UN3EIBf1OqtyKP4Gi9kXP9dn7japg/fB9KtOWsxs0dSH59JYa3JXnnk1ufWjSvQW32cY7+76zTnX6v96THLiLeex3ic1F+nunh16sTRMBumipWkWtKAgzR6DJjZzqu68VZxxzIKT+fjrSS8JPDLOCR1YJ3bdnYWHYV/a9JYUdQy9P5BDK6jkWq6GtmTBjnQ9uISQV9DpSE2ew+i72UrQ7ebqo+i+HVbb6Axdr+bI+SHkqCJk52oSviYrvM4I/IrR2ewmz8wllUJ5/tarD6UjcdUUf3j+ulU88nGrVVLIbS651oCDWYf4pwE6ubwU=</GatedMarkdown>

</div>
</div>

<>

![rail-transport](/img/rail-transport.png)

</>

</ApiReferenceSection>
</LoginSink>

<LoginSink>
<ApiReferenceSection>

<div className="paragraphSections">
<div>

<GatedMarkdown>fsUy/cqk9TMgZc70s5isVtBYnJqQQ1vNJb6VaPOrecr47aJwf17hCtzGTe8RYg4XyhuDfvS8oof/KYo638cUYixYlO6ME9q+GAjD+AyXRlsdJefyOhFeRJbm41iL9eZnyIyj0qYQwY83lQ45PHRimwh9X84AAAEao9lSmByu0/ikCdJr0dE/kH2llfly9+nQo7VRyzveILryZAiYYtLtoxujxWGhj9MXTPMIzIiCMlSAgx/INM9Ob4BJp/FcnCTW8GA5fQ42NQK4MG3or5zW0uPeh4oRPjc5SBxlkz0DE12F5SR9eJQs8V0yvfGu/7OkHJNsKbnFCBE6tbGyjqC3BmeVQefTTQ9aOhBLQqnrUXysQ+lLsZO3IjmRWub3yGGX/ugKI8SA1MXx4p3oa0PSpI8z5f34N4W+SwB64QNUqMsy1Z6zTEh5dqM4sv5Q6Ps=</GatedMarkdown>

</div>
</div>

<>

![logistics-sites](/img/logistics-sites.png)

</>

</ApiReferenceSection>
</LoginSink>

<LoginSink>
<ApiReferenceSection>

<div className="paragraphSections">
<div>

<GatedMarkdown>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</GatedMarkdown>

</div>
</div>

<>

![distance](/img/distance.png)

</>

</ApiReferenceSection>
</LoginSink>

<LoginSink>
<ApiReferenceSection>

<div className="paragraphSections">
<div>

<GatedMarkdown>fsUygovj3yEma8Kn5I6sRd1fnJqOSFvLObmcb7e6Nou74rt+aFfyXtaAGesbJQIJ1wGTZLuhuN+6Fth04aIMeDpY3fWKVry8Gg7L5V+9Cx0KP/y2JhwKDJ787xCdqp8EhcLD1KAKhYMqmh87O2l0gUszGc9NQxoH8c0J83v3+Z/lONRxzN0z3lu4iK168KfhlMB2jmHnPrH9fHufJOnwtlWV3H24lNcVXb0vhamJUQrT+WGtAMFbKsNHp+EdgTjS7GB9NAsoNR6/MH3gtdmviKbqj54NdhstSR4AuSgWDxSfoDB3eowspkwzv7mXsuGsHp9zLf7jS18msbmqkqXyO2WPWK7SXkMVdR1eTeDkWH3jDOVC8redQXfwVuD6xHuKsfJDbsGWw9b2t4zsD0mTi5Q1qeLtNuz9DTQz7Q5Vgq7I90CTbLDz71AJdfQlIXDMJE/88/1lXcV6/s9mOl3xwSc0C03ILdbj3W1rYSqhxfybEOoVCoYuaV9b0rVJTjWZqEA6je1eMg6Xehce+cJC2+f/wYwZkOBtaLw2tdINmE3e41O6iLHajCGBrXr4vEdbYQlP9MPhqzbgP8TVUr0nZscj3kUdIdKFEAA8l8VOnt7QXnCp7iHWXIw3zpoyw0jgDzoOlmyp466hn1+ovDJy7qpfjnAWd1M8PTPrwkHFBdlzp5kOvD9RbVr6P4kJCYLdCy4FO5wDSG+BKj6qCxuemWx5wmzFnoOd+/dIAj9bkRvidKfaqiz3mbqanBIjmgHOWO6EJsJkrHrfQsuCLxpecZCB7CiLE51Tp0XiWh9fCGnn4Idl+rDYLBRWwHZJ0KXP9BdIeT8BeVrQ7z+GKEaoCwRwDShH/gOo9xmBmdLaaEEhXI1U4uvjel6rMtXFC2s2YceERTaL6OEsTPOJsmHd0dn9TRXhegxr1qA1seaQ969v5UnkcDPBsHjd2fMaXLrpSudM4gLH7+i95jYjqt3nzifSGZXp9cAREWV6mlbb7wO/p9PlVgvE</GatedMarkdown>

</div>
</div>

<>

![cargo-weight](/img/cargo-weight.png)

</>

</ApiReferenceSection>
</LoginSink>

</div>
