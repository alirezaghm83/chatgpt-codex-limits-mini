// ==UserScript==
// @name         ChatGPT Codex Limits Mini
// @namespace    alirezadigi.chatgpt.codex-limits
// @version      0.12.1
// @description  Shows the remaining 5-hour and weekly limits in the ChatGPT sidebar.
// @license      MIT
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAABLzklEQVR4nO29d/xlRXn4/54559z66dtYdumwggiIYkNsEWNJgt0Ek1hiokk0GkuKCX7VWKIxEltMtUQJwYohiVGIYseKgIIKSN9dtn3q7eecmd8fU86cc+9nd7Ekef3iwGfvvafMmXn688wzzxGA5mft/2yT/9MD+Fn7n20/I4D/4y3+nx5AqQnxk++S/206Tv+vGtB/L3xCBOv/RVD439AcbP6b4fLTJwAh1p2UkAJkhIgjpIwgkggpQUgQIIQAKW03jniE6RIsM2nEOjMZe6odh+vL3CvCU+Aeo++pQKoMQGu01uVPpUApdK7QeW7+lFof6QeB3U+q/XQIYMLAZZIgGw2iRh1ZryPrNYhjZBQZJEsQiPHBlKQGBYLs74IAzDO168FfexicpSdjW5T/GXv8ek0IOw/t7ij6F44YckcMOTrLUKMR+WCI6g/IhwNzPoTBT4kQfrIEUBmobNRJZmaIpqeI6nVEEgECHXDFJJ1YAM8OULhhWtYXwT2TZqB1gTjN+AW6fJ9GBxLGnBOICVJBu5Ol69wcNOH1ojS8dQlHCIQU5vlCgNKoUYrq98nWOmSra6gsW+/uH7v9VCRAMjtDsjBP1G5DFIG2Yg+NCIDuxHlpNCHSwtEJYfGqS7j3RGeRo23vpTaRCIJeSs8xfbpuzakymMTBdIOXRJXrSo/X5WMiIBGr+oSIQAr0KCVb65AeWCTr9UrP+Em0H58AgsEkMzPUt2xCtJpWzOVobfXsmKJehy8ct+sAMdXLqgjVevIkCkPBH6gKDqGL454LA6Izn6HIEF7Ej42+JFUcOYrKJesQaUAApTELYdSk0uRrawz27CPv9yfN9kdqPx4BWOTLWo3GkVuJZ2dQKkdnuQXmjzAcBwdPVxZcTvo6AOsA0k5a4KSBO2GmV6jigItLssQ9syyOxlQDIV7GEVuYG864nGBbVK19/7ug+eJhTu0ZQ1HGCQCjA4sM7r4blP6xpcGPTgD2ztrcLPVtWyGKUVlq4S7G5n3o/gLzuwDfQbhbH/R7SDzFOSozrih5P2ZRJhjhfIWAaPyxYuzhDErd+R/rSbyDNCehtAalQAiiWg3VH9C/c6eRBj8GEfxYEqB5xBZqR2wmTzO0UghpDLyyQTVmtk8eRpn0yxLe/0PZANS6cou2p+01jhiq+C2p4Enc6qz+wMOw4sfYBaIYsphAPOWZlaY8JjnC+yvgKWjQ2DiF1NOIKEYC/bt2ka6s/MhEcM8JwN7ROmo78YZ58tGoDIjStROOTeLMsO9AjDtD0d9YnWAIlFL/65ybxP0lW1AUNmh4mbBWelWkVzh/krgfkwqV+0VJMujKFC0cQnfSNScN4hrD3bsZ7j/wIxHBPQsF2wc0j95OsjBPNhwWhlNpzLoAmB9POHEsW+riJ8U/uujIKn3H0f6igkBKhl4g/j0gQpVQ5k/tn285XgCB+12mPXutGNfrTmnpYD6hN0BgD1l6qtxfIcaw40k/tH2K0uTpkPqRW0FrhgcW7zERHD4B2I4bRx5BMh8gf9J1wUALBtOU2aEQZ5rxuZd0ubai2B0DUJoikqfLSNeF7AiJpHhGGUjacnZhn2lPpEK4K0IM6rINEE7Jc7QukK2Dc474RTHOKlmWBB9VJzSAne0jHw6oH7kVlWWkK6v3iAgOTwXYDmsL8zSO2kY+GBZUXXKbKKJgfqAVMenOBMgqHw/BF+p780+hEymd1+7mkPODa6q6tTwO4cc+BhWHUH8quMbbBsE5b0ZURH14LBD7RVi6MjZPwXb8IfNUjF6tFUJIZBTTu+VW8sGAw22HJgB7hWw0aJ90vIlKhaHTwI3xxvMYAMtk4JDlxSoWEaVJlydZ3AdoVXQccL/rx3QTIL5iLPoxVT0ML6oL5InwuGM8IQrDUgiEKFbVPdeHyBaBV0NF74/ZDZQwUvzUFcBSgqEzDMlyej+8Ba0mytWxdhgqwEy+se3IInwbWstetNkBVsWPF7+CkgWP4yZdRnhJlAeSYkwaGCLQ/v7wWgLxWr3XjbMwuIrIsaPi4E4h/LAd3kJxbwRIDhUiCH94IelVTMg3OmCOgpnWcX6hBDNre9i4g84yolqN+uZNDO7ec1iq4OAE4ET/hgWidgs1HIIMkD9mvEwY9hgCRTHpYC6+Hx0u6BSfHkleGrgb3TknCSghdxIxOm4q2wcODaGr55SRe2aBwcL+sffqcPGGQiqIgjBdcMxLJUcZJUMhBIwdkaNJoQMeKhRl+OB8NCJZWCBdXjksVXBIFSCiiPZJJ4CUaJXj9SXrhTRdt+5rIHPH/HYC7rfnVNl9O9iiUVkEljotPy/gqKp2Ci/3bB26Z34qojStsm0gKvq/fL0/V1GbY8cprtei/Ls0Pspw9HAC0AoZx+RrXfp37TwkhteXAJb7k/k5RJKg0xFWsxbBFlEFopNtAYhLwKXgYMd5OkCa++6vCSVAKCpCY6mCbH+9G20ZbKXv4bMLw6C433KoLln8dtLKA8J7Ch4+4ZSdBBBOAni9UTbswkmVkCbQxQpaMKeAoD3/mH7zNEO220SNxiGlwPoEYEVUMj+Hyt1ypA5oUVRVumlKlycCoNUYp3kElZCuKXR5cbwa2fNdhcj3MDJiUkhh9LLW6DRDZWaNwjN5JBFxhIikUWvajj0EQfgllGSlk2a8offjPRUhEE5+ByrHOQ+hPeKWnw3NOfe2uDd8aEnIhXAIm4Bkfp589+6D2gKTCcDeELXbiHoNnabBqN1jJ3eorX4Vxa8xrg+RVTbg1iOGYJIlrq1yMQgp0WjyTg81GCHjiHhuitrmeeK5FrKWoAYp2VqPdHGVdKVrrqvXkO06QkYmUcP1KUWJIR2zlwh6HU4uC+4q8bprdVnkawyxCCs1KpZ/9Zujy6JPbdCncqLpNmJvhM5z1msHNQKT2enKDO1TQgQ6DSXC63TBNP62Esni9bLWAefp8vkJSHeqwIPFuTuRROeabHEVWYuZOfV4Fh55BrMPPpXmjqNJNs4gmzW0BJUp8sGQ/oFVBrftZu0b32Plc9fS+dZN6E6HaLYFSQS5AiVMQorGun9lPW7G56KABTYcJ7vfBo/CIkgUhqoAhDQRRkcI7lqt0aK6IjkuSfQ4iaKVRiQxUbtNtrp+cGhdE0EIQevE4yGOymLdi+XS84qAhhXtzje3aCt3XhLtgRpwuPcSoEwAJYMQK3oBpCRbXkPWa2w97xy2P+cXmH7wqchGE0VOplLyUUquFFprlIWviiXEJg8xHQzoXnMzi//8Xyx/6PPkKz2i+Skzdyebg+CXKBFBxUAMDcBSQMgOvRI+N+oqkLBVI3TS4pojgDEDuwiWyTgmX+0w2LW+GliXAKJmk+Zxx6CyrBTrKb5UdGL5ikDcBy4cEOpzLxpDohpTBQHirTEo7DEhJSpNyVZ7HPGEs9nxymcz/8AzyMgZDbtkaYZCG2SD+a5BaYXSGqUVucpN0CSSiFYdahH9a2/m7jdczNonrkJONxGeCQLZXkIYrBsFpDhWFfUuYFRaTwmCUSJ8TtC3M06rMC/gbo9LicwV3Vtum4h8N5XyGW/9z1M/cgsqTccmUnRmbx9j8ELECz3JJ19PHVAQhkO4u895ApYjRRyRrfWIWzXu/Ybf5ZjffDIazajfJUejpPBI9p9Y5Nt1hNwSg9baXJMrtMoRUw10Ilh6z3+y/4IPQpohmjWzAocoE0JIBFVODXnEifWyNLfiv3yfJwgxTgQHS0fzTBfgRkYxg9vvXNcbWNcGkI26BXZlwE6EVZEXPtvpqIoqKDh7klqoqI0x97D4E3HEaHGVqZO28YAP/hkb7ns6g8EyORptjUCDcCvu7Z/Smlxpi3QjEcwxhbZEoYRAr3ZRSjP3m79AsuMo7n7OX6KWushWzYZYLU58hIbADiimWp6fMHo+AJXxEJRxMwPEOsUpkJ6GzKco/xaFdpr8UEAKZKNuCGCCGhjfGmYvkLWkMMICsRVG4EojriBLV5FfcdX8tUrb9GjzScDlaOXz5h33i0gyWlpl/n47ePgV72bhvqcw6C2ipTBJlP4/LOe7P0sA2nB+ZokhV8p/Zrkiz3JyZcY+uHM/yVn3YvM//xFytokeptZl1HaahYorjxsPh/JczDxClRZKN9+nGSzaEaaP62sLPc9FFQekIh0svGWtNk4Y6xIARsyIJKH0BG+dBvgPpY2n2yAkOzZBF7kLxL0FjMt7c8DCTVwXn0SCbK3L9I6jOPvSt9I6YhNpr4OIY8v15k8rZfq1vw3SFZlS9reyCM8N0pUizxV5ZgkgU+RphtIw2rWIPPloZi78LUOMLl/fzkM75IZzVY5wqwQdfJ9EDGi/zF2SfE7S+t8V3pvA+B53SltcBhRxSAKIY2P4ODljsV/oGMfhBtBOVegSApUHzBjFO65XAdL9uCcAxlrvepgStRs86F9eT2vLJtJ+F5HEVpS7YWir6w3Hm9+GCBzylUd+TpZlZGlKlmWoNEWlOfkoIx1lZNZzGN25j9qDTqX9wvNQqz27HhJwuwdTmQO1rsIoQGwgAbUlcq0KQvLEH0oYTcEMBJIUAvh7LPoxiChaD/+TbQARRQghUSr3SCkiIJrQdiw99GDUWvpeDLEa6PH9VaSHkJJ0pcP9/uGVbLz3aQz7B5BxRGbPK7TX+TmWy7X9rRQqy1EqR+UG+blWlg7N7hyVKy96lf2tM7N9C6XIdi5Sf+rDGHzuGvLrbkPOtCxCivu1UkZ6SmmYKDL8FSK2cO8sDAVFWNmJW2tr+o1rIewc6B1zBtJ33Dw0F4soWtcNXIcAZIDwKv4Cx2Gsv5Baq4g1573OKiG4gEeIfA80KciW19j88w/kxOc+hdFwGWLD+ZrCxQs53RNEmqPjCGYbJraSZyYkPBihVrvkw9Q8MstRbu9elqPSHNLM7+NjlKGTmNavPYa1C95Pun8FtEI2GySzU9Rm2kRJQpaOyDoD0tUO2XLfjL/ZIGrWTSBJKQ8rwiCadhZdAGeXhKpASwLYhY6ICNIEygTh4CykIcpJEcEyAVgqEbIsMnT4Ixjs2Fq9xrp9jnCsNAjEpQ4pSlceUuH8kp6VgpP/5DkIERuxaCNiCmvtK/tdB5a9EMj5WQZ79rF6+VcZ/OA2VH8EMy3iHdupnXEizLZR+5btWoGynxlkOTrN0aMUnWYIrcn3r6JmWtQfsINNUzNsecJDmDr1OKa2HUFtdgoZRSau0B0yvPsAq9+7lb1f+Q53f+FbrHz/VgPw2WkbqtUFL8mQJIrP4ksBYkc02jJTmK9QhF4DWWClZzlTK0B5iVxcDGB2hvq2rTb7xz2/IsKrBh14XT3O/SFH4yfgiUAUfaLLiz9CCrKVDpsefRYP++S7UKMBSInSmsyK+sz+ObGf5zm6lpDmit3v/AgH/v4y0lt3lScuI5KTj6L5q4+h+eRzyHtDVKdvOD61BDDKIMtQg5ThWpe6jDjplB1sP/UkZjduRhORM0KRo1VuOdNwW0RChDG+BmuL7Lny69z0j59g16evAilJplt+A6iQwqDTB5REESOQxU5pIaTNuQl2T1eiimFswjmmUkj6t9+BGlViOusRQG1hntoRm+2mRMvtHvMUiKsYa9pasU6sm2tV8LssGZzKGLMF3HcBIo5I9y1xv/e9ihOe9VRG/RWIJDmFrs8s4jNt9LtOYkarPW5+5qvpfOabCBkhGrUyoJRC9YeApn7O6bQv+HV0LUav9SHNDeLTlNFqF5nmHHXcMZzykPsxt2kjmc5JRyMzr8ragAdmaCAmEXHUAnJ2ferLXHvBu1j61g3EG+aKG8LADwVifZjYEhYUx/wWtVIkMUSuDQbJiN4dd6IGw8MkgA0L1I7YbDghQE7ImSXklww/VdgBIUL1BPsgtBmcKBD2d25cLp3lRO0Gj7j6/Uxt30o+GqGENe4s0o2bF0iDSHLjL/4hnc9+i2i6bfS5dgLUPRlbn0Ciuj3iex1N+/XPMyd7Q9JOn7w/ZMvWzdz7Ifdn83HbjdRJUwNa4VRQ0Z+fUwW8Biw5CEFSnybrdfjOBe/ixrdfQjzdMhto0Zi0shDpeEQbaSCC38J6IwGBjKHXNBlHDO64i7w/qGL8IMvBBUoqNwXcjKaExBDJUKzU+ePKE4rneqvfEQI9SGEwMkuw7QZiwyw5mg0Pvg9T248gS0cmrq+LKJ4xBK27l+Xo2Wl2/+VFdD77LeRUGzUqtlaXkI/VwypHtlvkP7iD/js/QfK8x5HtXWJ2eoYd5z6Qo+9zEjKKGI5GFjQG6KoEgQLt7jf+Kru0G5moXn+wgqglnHHhBbROPZZrX/gWZKNuLHUrDgtb0CtLI84ViMjVHsCvT3jtLgI1YqV2kWwriskHbbIXIApQ6ZCu/Oyc/06Zq3UY+3fHXDJImUA8n0iB6g4gy4mP2Uxy5gnIHdthwwyiFtNbXGHuzFOJRMxQjUAGyNcW/dr6/LWI4eIi+//mEwageV6JlAVEHXyiQTSbjL7wbRqnH8/Jz/oljrnPDurNFmk6RGeZ4b6SbhUe8SER6MozSqShgSgiVxm9/n6Of975yGaDq5/zOqJ2A7+ZxoaAzbOE78UYj8bVREqfJ+g51K406WAdfj2p4Nr6+QB+HSAQ/wSIqyA+PFxwfaEyNBrhJYKAWKK7Q/RoRO2sk2g++aHE99uBrtfI13rkSx30SheGirjZInV8rosQrxmeFcV5Du02vS9cQ3rrLmSjYYzSYEohYjTW3VUa1esRtRqc8JJnsuNlv8b00dtIsz79YZ9IShtiLqDgdgHpElRKYZkyo+kALhiuJYro9Q5w1DOfTH//It97yduIN86hc2VIa5LfHiYK6vI1JgnVzdC4kP65VUMxaAfNCPKiOpxFOEs3kNDF84QRnEPbEKdtEvIDq9RO2sbM751H/RFnkCPJFlfRy110t48ejIxFrrXJ4sHoem0NHyeCTdRPGx8ewfCmu7xa0cFYwzCDq8ihemaf/RFPezQnv+o32XD66eT06Q87SCFBCPKQskWIyHEJALq0fqZDUeNtIoHbf6ZjSa9/gONf/CxWvvkDdl30KeINs8b+0WbvX6EOij7MGlSQfyisWnUSRAfP9V/vIQGUB+9HUAzEu4F4vV6I/co1oZGnQa10mH3mo5h75fkw0ybdu4rqdyFTpmiUjAxnK42wrmWO0ffoAPm6zIEA2upqN65w2kIIiKRROSjmHno693r1b7H5MQ8DFIP+kvWZJTluO1owc8d0QZ8mxyD4s4abAUFA9FVudiMWmmHW58S/eCEHPnc16dIqspaUYO6SUjXab5X0JGeZ3R0RjvsdtVaJ4bCMQMKL3B3mM0x+Krl/4W+vEgIVIQCVo7oDNr7uWWx44VMYLXYYLXWNIRPHiEwhRFogLpis0/s4I9DaFiV1YEcYjtx/iSL0cIQeZDTvdQzH/8mz2f6rjyeKaqT9VWNlR7LcQ4n9gkOW07RdXCKJIKrZB+Wo0QiV53Zp2k0j2Degi5EKIciGPepHHMlRL38mN//+hciN80WMIFQFCrS0gR+bS+gYXlQQ6zOWx6FRagfNCRR2xoXF7phZM0bR7ryLA1ixH3oEqjtg27tfzNyzHstg5yIqyxFxglAjXFasxrg3PjdOChPLR6G0iYl6618XUkAx3jQgI4nOFarbI9k8z/bf/2WOfuEzqM/MoQYd1GhkJI7A91IyHLVTnxX9myto1pE0GHYO0LntFsQoQ85O0TzuSKLaDKN01awnSOGTUMLBCaFtToCgP1ph87Mfx853f4zhnXuRjZqBeXXR3863lCwa8qgfuAXgJFwFbR0CcII14MRw8sH3arqWZ9vgmIgk+eIa2y78HTb9xi8w2HkAEUuE1ohcFZNzohPno1t/W5igjxOzfpVPG52b2xCwIAxPg5CSvNdHNmpsfuGTOeYPf5320ceiRx1GvRVkFBEmaDobX4QGFEEBCUDnClmrEdVmWL31Fm678CKWP/1VBrv2o4Yp8VST1o6j2Pxrv8DW5z8R3UjIun10JNFBerzAMKnAWPdqOKQ2t8DCM36Ona9/H7JVN3EQpXymc4mjdaEaSsgPUSjGJdhhEUAJj+4Jgc53SQteGqiQEIL70YhYku1bYdPvnsfWlzyd4d2LJtE0yxG4TJggmCGLY0La4IdFdm4HV0rxsufM2AI5IAV6MGL2CQ9m+xuez/R9T0FmKaPOItKu1KmKnvfRDx3631aaKoWIImRzlv7iAe5653u5610fJtu/DEhEPUFGkrw3YPXr17P69eu5+18+xfHvv4DGidvIO12IpOdgHH4ESEtsI9Vn9pcezO4LLynqBHoYB+65Myod1WqMzShFGeGTCONwCMADwrGB/wvFSYFwP6bScQ1Cojp9WmeewLFvfAF6pWd2sKqiiJR31IJIlsvucd0p5XS//cQt9RYE6VK1vAbPFaJZ46h3v4yZY45ltLKIiGMiy4lu44X5twwpIQKbQhkJkDRnyYY9dv79v7DzLy5i+MO7EElC1G4Fas8gSbRaiEjQueo6vv+4l3LCZ/6K5pEbUYPUz8tJS6lBWYLP+31qpx5DbcdRjG64HdFuWFgKa9MVBGs25hTnCpyAjyIeXPoDB60WXiYlXXwt/vy5SrAjuE9lOce+7nk0ZmcgU8hIGhcrMEvDeLrxkgxCRKOGmGqiY2myeShSuIzrZ34rK400ujCJlUY06ygEw2EHHUdogV84Ki0e4f4UOXaRSSmyLEc3W+TNFrv+9bNc/bDf4pYXvInhrbuR7RYiiuxuI1XMHyBXqFFGND3F6Nad3PW7F5IJyHXuM5GUMokpYRjbbOmaonnGCcY2KeVeVrFZqMTgUOCEVTE/mRIOYgQWyAw5ezzDxxFEkLtn/fB8eY2Nj3sQWx7/MIYrHaIkQeWZXdkyCJdCGA5w8W+toVU3ov76XeSfv4bBhlnyc840q3x2JVAT2gNGKkitS4SJsvkBbutXiVmM7vWk6MWphlwj2k2gzuKXv8WuN7yP1f+8CpBE01M2UUR5onX2qn+09cR0miLbLdY+9VUW//3LzD3pYeSLHS8FDAiM/25sUIVAUT/1GN8PATKFcEW4zMlxb8WxvfmuRXF6vbZOHIAyRTvdHhBC8eyCCLQujgkT9mf7bz+JWMakCJTAi36/qCGLiSitEHPT5F+/gf77/hP1vTtRgwHq5x+AEjZ7xxm26BK1l1KqAui5DCHnQ4fIqn6SKROXj1t0fnAzu998EUsf/BRkmdkeb5eMRbNW3vVkeykFW0SwDR5YvuSztM872yRlaFsAG4t85+erHK0zku0bzVmfDFoN4xRKWtjYgxhLOS9iByXurxDDuhIgWGKwN07Q96E94D60WcPPu32mTjueDT93FtmgbzZiqsK3NWvaVgO5bN75KXoX/ReDt34I0hQx1TKFpKPIWPpKo0WxyFH82d+5rsyv2BegfVURYfSe41IBZMrYB1NzDPbu4+6/+gcW/+ZS1EoH2W6BkOTdHvXTjkenGaPv34Gs1yE2++7Wi7IZrtYIIRl++ybSfUvIODFqw0pB6fx5e61Oc5hqImK5Puvq8mZUR8WG4GSAPcPJB7MDD10hRFsqK+uD4qsOjzvxL9GDIZse+xAazQV6nUW7ll0gwbOiFWtyYYbRhz5L/00XIWo1W24WnzzqA0EO4RQcbzRQ4R768Sn8vdpzCihnciiFFJJoepq022H3O/+Zxb+8hPSOu5HNJrLRQHV71E7YzuwLfonWk86BPKfzgU+z9I5LUd2eIRCl1lGxllWiCL3aI1taI1qYhywz+fpSoIX0K5pCaUSel43gEi6sDA5W9jTF3sGQEE3owInm8SG5ti4BVHfdBlguEB24hSJ8kFIQx8w/7Ew0eRHDKElIo/+lFMh2g9Gde+j++cUmhdkGb0RsUtN07ghAgXYxfl1xSPTY4g8EqeJaoa3odQiLZqdIlWbxw1ew+KaLGHz7RkScINstkyOwcZaZ330i0896LMnCLKo/gCRh/g/Op/3YB7D/Ne+nELLIPSIZATIONcgQE8LkC0btJqNd+/j+C/8SpYXZTZxnRO1Ztr7sl03NA1namF/Cd2FtETBrME6xHrGsuzUseJAId9GF0xf+bzzlyFimepgSbd9IfMKR5spGHdk0f44IonaT2sY51Fyb299yMTc9+AUsXnIFqlVHz7R8iVe/M1iZMq9hOrhbJlZpjphpQyJZfdPFrP7hPxiXdTBCdfvM/uq5HPuld7Dlpb9KfsddLL/nP0AIks0LHPPbTybLe8Zoqk1x6/v/lQNXXk0yPx2siZRmSCghtTJxDe14R9jVT7BLyRWkhC3LiRdmWPzkl9l18acQ9Sk0kKVdNj3lETROOc4UtQhc1sDGLvr2kccQURVGqbTJBBBebXsrEe6kCwMacI/TaWYKP81NIeMI2agROSJoNZBWGtBqINsN5J5lhjffxe3nv5rbHvcK1r54HXphCl1PyNOUXOehNirc0Sw3Rt3CFINv/oCVX3sjg7d9GL3WQ3V71E8+muMveyPHXPQqals2kKZD1j71dfT+FdCarc94NK0t2xkN++h6jc7+u7ntXR/1xRyFn2Jpkp7TnBfkahWbMnbaFGtym1aryBdFr8Z9UIh6jbveegnD3hrUIvQoJZ7awNwTz0ENB7agZBnZ+K+6OFSV/evbgOunhJV+jw2+rBUm0pcwN8ZbNxC3msgkRtZiZCNBNmrGHmjav5k2Molgac3k2Lea9D57NbvOfTl7nvsmBrffjdo4baKGWeoNTp2bYs5ifho1HLH2mvex+pw/J7vuFjQm33Dzn/waJ375Xcz80jno5S4izYnimO5/XGVcuChi6/mPQWECMkQNdl5yOYNbdyEbNW/Mhu8LLuBSFrfOTin+AjczuE5AEJS0alQponaT3nduZumKr0HctCHzEXOPfyAkNUMkAYa8yA9A7vE0hpLJVLD+7mBddDmRjPxz9OTfVjyKmRY6kRBHiFqMqMXIeoJsJIhGgmjUTDEEQI9MeRhyhWw1EUlM5wOXs+fhL2H1tR8wby2fnzIG4iiFeoKYbdP7ty9x4Il/yuC9nzQiX+VMPfpMjvv829j2ht8hqtfQKx1TBb1ZZ7hrL4Nv/gCAqVOPY+b+pzBMe+hazGjUZd+lXyCyaVnOjSuDOXAvA+Sa6qUUO45djCD0ovzPdVhTKQ5c+kUUwrz2JhvQOuMkakcfgRqMSmogeFNh6SPEkWfedaRApVi0G1dlcJVwqemvIl68Q1mJLWmIktjE8zUoKVGWo6SNYuk8R26aRc5Oka90EbH0ole0W+jOgNU3XETvks/SfunTaTzj4YjZFsMbbqf7xn9hdNlX7EsjIN44yxGveS4Lz3uC2Xm8vIKIY7OPL1NQT+hcdzP57gMAzD70DKL6NMPOEnJqitVvf5/eD+4wWbnOlYV1atAEeZBaFxFNaxiroJ5iCJNSAk0Ya1FGDXS+8T2G3RWieowaZcSzczROPZbVH95lUtyc6rG9+ZdTekS45wmEWAfztpUJYIyCVCD2Jr8Tx0RZw5e06vIwOn1TWSOJ0FqAyEBEOI0qhUCnAhZmkCcdSXbbLoSs+Ti+znLDubWE/NY9rLzo7fT/+b+oPeBedC/+jMmikREqz5l/zuPZ8urn0Dh2O/nqqgnsxVFArApERPrd23CLVa2zTvblZyBm6WvXozp9ko2zhmDG4FLo3qoBpiiqmbnsAKwvLhywSqIfzy/CHpL1hOEdexjcspup044n748QSOr32s5kKnRjKvBTSg49OP4PlRUc8rMuM7l/gKE+QwfC168Dsys227lovieJ38qsAZnYHS6RNHv+gfpTH0722WvwMXUHOLQpKVNLEFGd0VXXk151PSKpGa4/5Sg2vfm3mPuFc5CDEenSsonPewUncNvGJZD9cKc5HEVMnXIsOZndMKrofudW4555qa2DyVLQuHbACSGELzIhMJtYyJXZC+DC41WHySNIGKshkqhOl8Htu2iddiK51kg0ydGbA9TowAYTjtndL0CjtfDXjBeLKNq6NkB4i/BqIRz/+qEIwAZTEtJbdqHXesTNGjKSRElMlMTGK6gniCRG1mPkKKP+sNOp/fq5ZhNmJM2fCGZmrW05bdwkUYtYeNWz2P75tzHzhLNRS2vkoxydRL6gtMbuBraFoXMUo537AIimWtS2LKDJ7MLUiPTOPbaCqFvmNtAwHOr0fZgEUyDVF6vQBvnJVAvZrJEdWPFRuiK1rqqXi99a5Yz2LaFxK6aaePO8PaknQ92rK1E6VtE+Y21dApioOoIxi+rx0gl7oJ6Q37GP/KbdxFNNokgio8gQQS0xnkESI5PE6Nz+iPYrnkHruY9HdXvoXt+uhhVuh+73UWsdWo85i43/9Wbm/+y5RHFCvtQ1W8ukM4+E5chgmEKgswy10gEwY5pukudmt24+GJEur9nMZSsBLdH5YJd3vQJgOLEYmUAVkUSNhtSPO5L7fuHdbHjqI0iX13xCqw6Jx9lbJWNNozthaXdN1KhTNj7NMwtBYL9XhNVElz1o68QBXMwp0FNUvgpKQqAcDrYnIokeDRh89tvIVt3sBUgiojgmrsVEibENRC02O29rCTKHmQt+jdn3vJzk4achWgk6zdD9EToW1M88iQ3vfglbLns9U2eejNq/ahAVRyF+ykTphiWFCTMPLVlYgjS1AwQqS8n7gwkLXpQ2ahT9avxaSJaTZcq8jDI3O450ntI85Vju/dE3c/LH30jj5KPIDiyaCKkP7RY2RMhgTnoFWAjWswKjoYLm8pXBNetIgYPvDg4jSCVZ4uJgNupUMjzdIqQBmqjV6Xz0Cyy85CnErToqVSihTL0f8MkTIlfoSJowbz+l9bgH03zMWeidB1B7F4kQ6M1zJCdupzY7Tb5iKozKpFJW1XOJCAx47blOxBFRLfbjzXNFYnW+lsLs1glCt9oTNBO51k4Zspw9//jvbHrUQ8nbTVSvbxadBkO01mx44qOYO/csdr39Q+z8y0vIOz2idrNY7w/7B8RUwx8SCLJe380uCPYITwhj0Vh9aA8AqhKgZDmGlFlQqq4SQigSRKUjZbZPDW+8ne6lXyGen0FqTRRHRE4VWBUQ1xLiJCap18xWq+6IKIXaMUfSPOe+1B5xJvV7HUukBNniqlkZk3bLFoX+9aNzOBNWFShFLkDUG1A3BKCGKflwhJJ2waZuglDFCyypwKAsYcCoCJ3lyJkW+z5yJdc++SV0r78N0ZpHRbagVRSR9TqQxGz/k+dz+lf+jvYZJ6B6A7872UsSrUFExFvmbTRRoBCM9ixVkDQxPmmOCF2waAiMQxKAn1xFv5VCi4Gx4sWPe1wlRIjRlaJW48BbP4Q+sEbSqhMJSRxHxFGEjCKkNfhkbL5HcUzUqBMlCSJT6N4Q3RmYTB8BMoq97+3EpPPDi4JtNixry8qJqQZ6lLL34ssZ3HUAKSOypVWG+5dBROR5hozr1I7YaFSOF7G2Nw1jCTE6iLsrjWzXOfCJL3Dt2b/Jrf/vnYx6KTRnzIukpEBpxWjtAK2Td3D0O15itpxbaeOLcKYZYqpJcvxWclIQAoVmePvdYzq+EvujLOoDaXIQK/AgdQKrbQIV6fJRHVzqfVENstlgeNMd7HvdB4mmZxEoIwHiiCiSxjiMI7NV3BKBkEAkELG0RBIZr6A06ULdFCXR3NvDFHmeoWsRuh6z+pXvcuebLmb5i99Bzk8bizxN6dy6E0VkahAgadznOOP/B9KuELllMIxBRGniOVMPcefr3sN3H/w89n30cmiYWgmugPQoXYOjNiFadVtn0HE+6FFK/dgtxMdsJh+ZtDlNSnrDHQjsjuHQM/Kw1+Xx+jEGxDuhrWsEFp864KkKAMR6tCWs4W7duFwRTU+x950fZelDV1DfsAmZ50SRlQReGsiiRrDf6FBJeKRAfpVDzae2yRcCMd1kePcSe/76E+x9z3+SdQbEW+YR2zb6kfa++QNA2lfM50w/5BRkPSnUQEnlVeFUwMOPLTfp8NHsDMMb7+SHT38lNz/1D+lefzu05hDtKUg2svpvX0Utrfq3egoHzzyjec5pJM0Z807DWsJwz36G37kV0TAvry69JMo9XJePeZmtJ7Kub+vUCHK3M8bl5kAR0QqDW64+jdc7QYAIQDZq3PVbf0GyYY7pcx9Itn+/ifJJ7LUCoWTJaCtlt3hV4w6LohCC0H4fqGg3UKOU1cu+wupnrkGNRkQbZ0xwKImIjtlC3qhBN6PzxevI1QCSGJUOaN//XtRO3Mboll0mv1AFAbAxt8J9CkyeflAxNDP7HTWapY9/jtUrvsmm559H+0GnsfLtGzjwzo8h67WSChCWeNpPORuF3REd1+l99Qby3XuJZmZKY/A5gR4owZgEhTFeco8OgwBKEsD536VZh9c6QVx6chlQ1nQVcYIeDrn1aRdwzAcuYP68RzBaXkQobewApSEq9Hl1zMLNVOB1tMDoSHITeBL1hO53b2H1E19heNd+otk20fSMUR/1BJIIefRmxBELiFsG9L59I70bb6N5r2NN2bepWWbOO5s9b7jIJLDYIhFlA5kqVxTugIOZM9e1NtVFRyl3v/Vif7ms130FEsAkrHT7NB5yH6YecRZ5v2e8IgSdT3yp0r8HhoWFTQcLB6krX++xCihReKFxhRDldQdReXddkK1q9YDnVrRG1OvoUcptT72A3W98P6LdJJqbNjWD0LZ6iPuzaiDc8FCqiB1sUplqkHV6LH7gcvb/9b8y2rdCvGUO2W4g6jWTf9CsI2oJcm6K+L4nIhDknS6LH/08QjSMyMwHbHjO44i3bkAP0iImEM65SpiB8euTQH3GrlnYIo6IpqaI2m3kVNsEm0K3TwNaMf9Hz0AkNbMpp1FjcNdd9D75NVNzyJfBq7p8E75XDOT11NjkfIBwf7olIeEGG5aJD4BSGIAFZRbDFIWI0srW1aux60//llt//uV0v/QdooUZ5MKMf32aCFPLnX5HF/n2diu4aNWhntD98vXsf+tH6Vx1A3J+hnhhGlGvmXyDdsNU3aiZ5yIEydmnQquOkBH7/+lTDNeWEPWEvD+kcdQ2jnjp08iWO6acmwP5BDiW6CFMyhQhUUhfcl5rbd8JRAGgSJJ3u7Sf+nCmz3sYebdj+oxbrLzvU6i9B4z+h4lZ2SKQNo47S1xvS+lMahPo2Yin2oYNJuFCG7+y/NqEsOnyx1iwRFfi37oQe1KQr3YQSczMeecw8xtPoHX2vRFzU2ZpdZiaLFwXihXCJIAmxiMQvQG9791B/wvXMbxpF8Kmm2HLr4iayQoWcYSO7fbpJEZEAjk/Rf+vPkb6uWvQKLa/8+VsedGvoDpLkMRoEfPDJ7+S3pXXEm2Y8S/RDKBrCSLYGOOAHvr0JSIuexdos21L9QfIbRs45qq/prZpA2o4gnqN4b4ldj7gt00iSy3Gc5GVqF4qeqYT5fEFSB4dOFBh7IMRQJJQ27jRl2MpWXz+CRP0jSMAN0srKXQAFF921gIPu4kj73YRSBr3PpbGw08jefApxCceSbRxFtlsgDClYtLFVdTte+h97QZGV1yNOmE70cnbjXpKEoPkWmxW4JIIEuNaEknzaWvyyKkW+tZddP7g70CbUrWnXP1eGpvmSIdDqNfJ7l7k5se+gvSOvURzbfQoDyA2eY4lQvcEUb7eSTIRRWaPYDNh+3++mfZDzyBf6xroTi9w9wvfzNq7P040P2c3ulgVSLglrEIAVUNVGOk9PHBgoh0wkQBEFFHbtMlPyht5Y/6ES4goehojAELgFMByb8L0clW6d/gN0Mpwm6zVkDNtk5olMFW11gZmkcjKJLl5geTZj0VsmUUMMyMqIxtTSGK/qiiTCOybQoiNWI82zNB7+8cZfOxzaGDTbzyRY99zAWl3GRBE7Ra9793KrU99FaPb9hIvTAd+OwFAnWqcQAAE14bEEEnUWhcx0+SIj7yauZ9/KNnaGlpr5Mw8K//xRfY86QKidgNvAEKw78+52k7dWCSUCMBKzTxntLg4hvz1CUAIaps2ooW0BGAu9dVVQp3vAySiLN5L4s+CokIc42JSB7rT6EqdO/1l07NcVS1bHUT3Bogt89R+94nITXOI4QhdS4x7GUWm6nYcGcngAk2xREfCqIj+gJXn/xUcWCMfDNj2t69g6wt+hax7AJDE7RaDO3Zz+2/+BZ3PXkM8P21URJ7bF2G6uQbvTA6JPyQAS+g6y1G9HvVTj2XL+/+Y5ln3Rq2ZakK0Wwxu283uR7wYfWAVUa9j3wdTIQCsCxgYWzqQzc7zkhI1GpEuLx8+AYDZHSSTxCBAhJcHxBYSQEAQpeOe491PRwQhkQQEMalPUZlh8TBDCIMRYmGG5Ld/iei046DbByHMu4ESy/XScn7sCEOglDJpaN+6kZXfvtAYiUJw/L+9hdlzH0LeWQIpjT+fpuz9yw+x952Xkh9YRU41jV52RB/ukiYkAIco0KOUvNdD1BJmf/MX2PK65xEtzJBa5ItWi+HSKrsf+wqya36InJ3CvT3F1bivinwnnR3PFMrZAEpEEXmvR7a2NgnN6xNAMjtL1granPiKb3/INgGhgS0xRgThPY7bi6PjfbvxuPulMCVYk4jaMx5Jct7Z5nUzgyEgfJiZKJAGkan7i9ZE8226f3cZvXd8AtlsIuoJx3z0Dcw9+mzy7qIBehQR1Vv0b7qF/e/+V1Yu+zLpnfuMRKzFtt9AerlCk6PUvszSVC1tP+4BzL/4abQefDp61DdqTWnEzDTDvUvc/aQ/Ib3qBuT8rFk2dlvBcQGfgAC8u0mJwQIvGRFHZKur5P3+REytSwBxq2WKREwggHVvCpHkca9Lv+1ByzkOocH50L10HOSOe9lWeY5THUqhewOiU4+l/oxHEj/kFPRU00TY3IukXWhZGqQSCUQSE29doPumf6H715eZ6GISs/0f/pgN5z8BNVoFuyM5ajeR1Eh372L1ymvofP46+tfeTLZrP/la3xCiNvv+aCTER8xTO/loWo+6L+2fvz+Nk45DoMm6XVv9XCCn5lj77vfZc/6fkV1/O9HcjDH6vMHHuKUffB97ZWzQhJSMlhbLXkx4nnVwKeLYuIKB/i3ECwXywgF5hAbdhlZ/2AJ7wairivFSUQMmD87062lcuzBtIGGEhN4ArTXRyduJHnYayQPuRXTsFuRs2wSF7MKSUBqyjPzACtmNd5F+5tsMLvsqIonRaY4aDNj0svPZ+trnEU9NkfVX/RYx2awjZAPQqLSL3rfCcP8y2VofoYBmjJhrE29ZQE7PoIlQ2uxc1raErpxqoRAsvv+TLL7i3ajlLtFM275Ct2Lli9ANLxiyJJjHNKe5Yz0PwMN+4hlMnQDhqlfp4o5CPAcDCXHsAhMVxHrdVJIOBIQTEFZwrLgoJLZxgvG2hwtf94eQp4h6A7F5FnnEPHJhGtFsoLWCzgC1b4V81wHU/hXA1Ac0gzV95J0OrdNPYstrnsfUk84hEglkPRimtkyNNN5GbO0M3OtijWFoagGndrURU3a+0UQj6X3jBhbf8E90//VLyKaJWArP+eWSb6WFt4DpxgkggHcUHdQAdPevSwDxzDRRq9geVb0wjEoV2bO63KsT9VUzQlfEe3UClcmUf066JjC8QrUgBeQanaaQ2gLRXrUI89pYGzcQwtoggQEno4i800OrjKlH3p8Nz38ic49/EPHcgr0mNaV00szuUzTJpFoYG0NEkX3XQA2FJBuu0bvqBlbe+0m6H/uCUVlz04UBKaWFVUEAHlWhKvBHLXBDJrLnZBwfVP/DIQhA1hJqCwsmx807+pW7fYQwQEqp1yJthOJQcGbsoP0cVwHjTU++vmRfuLE6Y2nS/obJ+tNfIGz9r7UuoGmeeDRT555F+9yzaJ1xIvGRG4haDULuN7WPFGo0Itu/zPB7d9L9/LV0P/01hlffCFmKnJ62GciFfTNWDcyN3Xwx/1cZwUcACwJwzDlaPDBeeDpoh7Tnahs2GGNJVxDkbg4M8nGxXQJj+cGecHXxImQhithAMKFqP748rQhUT1UlHGQ8Y2PBqjMCCzqIqvkxRTb20B+i0hEgiOdmSLZtIjlyA3LjLHKqYfY+DFLypTWy3Yukd+0l37uMVhlCxsh20xbFLt4HUCyk2RFVkR56PqWBF+wVEraMIvLBgGx1dWz+43M/SIuaTeLZ2aIyhr9pjK8P2lVgQpQk+WTDvkwAY4NcN/ZQGUN43aFdl+BaMbEvd8glraA1Os1Qw8yWkS3H2g3S3J7IxC90uZj8pDh+OdkjNPbCCRRWWChxdXCLiCJGi4tF9bL1pnpIsAiob9hofGZXrGjspqpIrZ4LEjeql2iqaq1MBJO6q54LEF0yWB10BONEM7G5mVVmWNGvIjjmxa3n3PKwfOZ0dZ5BCFdgJV8psheY+dYDKOZQUcfBcDUaGTvunxz8mTTjg7aoXieZn7dVw5wUWBdFbiSU0RimdJUfW8W/72KCPVEafElaUEa0f36xXLqOPAnGEKa4Va9xOmt94hsbP9XNGmUCCWP6JWSGsXb/2zy/lIRXJQD3MAnpgcWJq3/VdtiCMZmbRdYb/q2XVAEfDmjiCIuPcR1slUpg05S6dcdLiicoljCuGCePY9JMJ2mySU2bFG0R/A67LAmZsf6ceKdyj5j87PDCELbjurDch6aI/A0GhzGpe0AAQkpqGxbQmACKDh3/EgGEorIyOy+5Jsl9ShNeXypM7JmQv11f4zJqzAcIxn2Qh1bGNlENTbqk2uWkOR/qnNNiujxHb48EIkZEknw4PKThV3osh0kAYPIEkoUFmydXFYX2n7GZFxaqr5dXOl/tg6qknNgOxbjjASh/whNnyFRlTyq0HcKBVcc66boApOsi3O7a0eWqI+u5qGEvZY0T7AiyG1rTpaV1XOb1RnIPCAAgajZIZufsGkFZ37oBHozQ3bBDFFZFI1SRW75+3SGHmikYkwjuW59whD8/SRKV3ko+JgkOMq5JHsWhAFTqm4MQgLVabPAoXVo+9FtTqsObPOqDt7jVCt4oEkBcT+DMkiQoP8qjp6rzS32MC/sJ2KHKiY4AxoslHI7SX18nBDFEglWJii1QlgD+WOjeUeRZlNUmARzLVp6eREPWm0iXlw/p8k1qPxIBgIkPJDMzRb1gwEXgJmaOFQZACa6hgJvIGKU0p5K8PMjIf6QpVagwIKrgvKb8elov9NcVu2WDuTzHdSRHQABli6cCXxmBVqQrKz8S8iuju+dN1msks7MIpH1pY9gKieAeVHpqZRjeRihJ+wr0xzoIeh9bLl5foYyf/zGaLh5fPClEX6DbD0M9HnpYliRis9CTra4elru3XvuxCABARBHxzAyyZur6aFeaNRDFYzhdV8KKCV/LHHRQ3E/oZp1RB98nGLNVk6N6rnRrRSVNMgbXeVRpKKF0OQhGfMXxfo+s01n/wsNsPzYBuBa1WsRTUwghghLpofiuPLH65PUwWCGYMqeFbQLGJqmiiUgUUHVrq1CZRBQHtSnWAeukfqt9lZ7vJixN/aAsI+90UKPR5P7vYfuJEQCAiCRxewrZaIAQxdtEQg6utJJOHRP96wB3HQYu7144DEt7IsCr5ysPLGXfVHX0hHsPB7oTn2/1hd0dpfOMvNc77ADP4bafKAH4TqOIqNFANhp+92v43kFzgGBjp5gI63VZcV0Jvh57VbvSlccdjIMnSJUqd07UFYzZvNVgVUg8vqdgVVBrk8eQD8xLKH4a7adCAGGTSYKs1xFJYlKxbHpzKYw7ifonfC3bBQHHlyz3altPEhxMSlQfup5BcLhtgr6zks5F8gw8tNmNlZksIj0a/VgG3o8ysp/uw2yGjPsjMtu1jGFT2eZE1XA0Qy0G62rgFOqj+BVyuJiIO59PEJ6s2CYlo6xIYMCLZx0GliY/JwSvdhJQ2+/KvvBCKfOKOlv7+L+z/bcSwEGbW2ipEIE/zk9/oD8JYJTWySop7/7YPQjV/rTb/x4C+Fn7H2n3oEbQz9r/H9vPCOD/ePsZAfwfbz8jgP/j7f8Dvy80jz4gBHcAAAAASUVORK5CYII=
// @downloadURL  https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/chatgpt-codex-limits-mini.user.js
// @updateURL    https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/chatgpt-codex-limits-mini.user.js
// ==/UserScript==

(() => {
  'use strict';

  const RUNTIME_KEY = '__chatgptCodexLimitsMiniRuntime';
  const ROW_ID = 'codex-limits-native-row';
  const STYLE_ID = 'codex-limits-native-style';
  const PROFILE_SELECTOR = '[data-testid="accounts-profile-button"]';
  const EXPORTER_SELECTOR = '.ce-nav-trigger';
  const MOUNT_SELECTOR = `${PROFILE_SELECTOR}, ${EXPORTER_SELECTOR}`;

  const CONFIG = Object.freeze({
    USAGE_PATH: '/backend-api/wham/usage',
    REFRESH_MS: 2 * 60 * 1000,
    HEALTH_CHECK_MS: 15 * 1000,
    COUNTDOWN_MS: 30 * 1000,
    FETCH_TIMEOUT_MS: 15 * 1000,
    TOKEN_FALLBACK_TTL_MS: 4 * 60 * 1000,
    FIVE_HOURS_SECONDS: 5 * 60 * 60,
    WEEK_SECONDS: 7 * 24 * 60 * 60,
  });

  window[RUNTIME_KEY]?.destroy?.();

  const state = {
    destroyed: false,
    ui: null,
    mode: null,
    source: null,
    anchor: null,
    usage: null,
    error: null,
    isFetching: false,
    refreshQueued: false,
    lastAttemptAt: 0,
    lastSuccessAt: 0,
    token: null,
    tokenExpiresAt: 0,
    abortController: null,
    reconcileTimer: null,
    resizeFrame: null,
    intervals: new Set(),
  };

  let domObserver;
  let sourceObserver;
  let resizeObserver;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${ROW_ID} { appearance:none; cursor:pointer; font:inherit; text-align:inherit; }
      #${ROW_ID} .clm-content { display:flex; align-items:center; gap:10px; min-width:0; width:100%; }
      #${ROW_ID} .clm-icon { display:inline-flex; align-items:center; justify-content:center; flex:0 0 auto; width:18px; height:18px; }
      #${ROW_ID} .clm-values { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; min-width:0; width:100%; font-variant-numeric:tabular-nums; }
      #${ROW_ID} .clm-limit { display:flex; flex-direction:column; align-items:flex-start; min-width:0; line-height:1.05; white-space:nowrap; }
      #${ROW_ID} .clm-main { display:flex; align-items:baseline; gap:4px; font-size:11px; }
      #${ROW_ID} .clm-label { opacity:.72; font-weight:400; }
      #${ROW_ID} .clm-remaining { opacity:1; font-weight:700; }
      #${ROW_ID} .clm-reset { margin-top:3px; font-size:9px; opacity:.42; font-weight:400; }
      #${ROW_ID} .clm-status { display:flex; align-items:center; min-height:18px; font-size:10px; opacity:.55; }
      #${ROW_ID}.clm-collapsed .clm-values,
      #${ROW_ID}.clm-collapsed .clm-status { display:none !important; }
      #${ROW_ID} [hidden] { display:none !important; }
      #${ROW_ID} .clm-spinner { display:inline-block; width:10px; height:10px; border:1.5px solid currentColor; border-right-color:transparent; border-radius:50%; animation:clm-spin .7s linear infinite; opacity:.65; }
      @keyframes clm-spin { to { transform:rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  function isOwnElement(element) {
    return Boolean(element?.closest?.(`#${ROW_ID}`));
  }

  function isVisible(element) {
    if (!element?.isConnected || isOwnElement(element)) return false;
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 &&
      style.display !== 'none' && style.visibility !== 'hidden';
  }

  function bestVisible(selector) {
    const candidates = [...document.querySelectorAll(selector)].filter(isVisible);
    return candidates.sort((a, b) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return (bRect.width * bRect.height) - (aRect.width * aRect.height);
    })[0] || null;
  }

  function getProfileButton() {
    return bestVisible(PROFILE_SELECTOR);
  }

  function getExporterTrigger() {
    return bestVisible(EXPORTER_SELECTOR);
  }

  function findProfileBranch(parent, profile) {
    return [...parent.children].find(child => child === profile || child.contains(profile)) || null;
  }

  function findExporterAnchor(trigger) {
    const profile = getProfileButton();
    let node = trigger;

    for (let depth = 0; depth < 12 && node?.parentElement; depth += 1) {
      if (node instanceof HTMLElement && node.style.zIndex === '99') return node;
      const parent = node.parentElement;
      const profileBranch = profile ? findProfileBranch(parent, profile) : null;
      if (profileBranch && profileBranch !== node) return node;
      if (parent === document.body) break;
      node = parent;
    }

    node = trigger;
    for (let depth = 0; depth < 5 && node.parentElement; depth += 1) {
      const parent = node.parentElement;
      if (parent.hasAttribute('data-radix-collection-item') ||
          parent.hasAttribute('data-state') ||
          parent.children.length === 1) {
        node = parent;
      } else {
        break;
      }
    }
    return node;
  }

  function getMountTarget() {
    const exporter = getExporterTrigger();
    if (exporter) {
      const anchor = findExporterAnchor(exporter);
      if (anchor?.parentElement) return { mode: 'exporter', source: exporter, anchor };
    }

    const profile = getProfileButton();
    if (!profile) return null;
    const anchor = profile.closest('button, a, [role="button"]') || profile;
    return anchor.parentElement
      ? { mode: 'standalone', source: anchor, anchor }
      : null;
  }

  function iconSvg() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 17.5V14a8 8 0 0 1 16 0v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 17.5h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 14l3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="14" r="1.2" fill="currentColor"/></svg>`;
  }

  function createLimit(label) {
    const root = document.createElement('span');
    root.className = 'clm-limit';
    const main = document.createElement('span');
    main.className = 'clm-main';
    const labelNode = document.createElement('span');
    labelNode.className = 'clm-label';
    labelNode.textContent = label;
    const remaining = document.createElement('strong');
    remaining.className = 'clm-remaining';
    remaining.textContent = '—';
    const reset = document.createElement('span');
    reset.className = 'clm-reset';
    reset.textContent = '↻ —';
    main.append(labelNode, remaining);
    root.append(main, reset);
    return { root, remaining, reset };
  }

  function applySourceAppearance(row, source, mode) {
    row.className = typeof source.className === 'string' ? source.className : '';
    row.classList.add('clm-row');
    row.classList.remove('ce-nav-trigger-collapsed', 'clm-collapsed');
    row.dataset.clmMode = mode;
  }

  function createUi(target) {
    const row = document.createElement('button');
    row.type = 'button';
    row.id = ROW_ID;
    row.setAttribute('aria-label', 'Usage limits; click to refresh');
    row.title = 'Click to refresh usage limits';
    applySourceAppearance(row, target.source, target.mode);

    const content = document.createElement('span');
    content.className = 'clm-content';
    const icon = document.createElement('span');
    icon.className = 'clm-icon';
    icon.innerHTML = iconSvg();
    const values = document.createElement('span');
    values.className = 'clm-values';
    const five = createLimit('5h');
    const week = createLimit('Weekly');
    values.append(five.root, week.root);
    const status = document.createElement('span');
    status.className = 'clm-status';
    status.hidden = true;
    content.append(icon, values, status);
    row.append(content);

    row.addEventListener('click', () => fetchUsage(true));
    row.addEventListener('mouseenter', event => event.stopPropagation(), true);
    row.addEventListener('pointerenter', event => event.stopPropagation(), true);
    return { row, values, status, five, week };
  }

  function setText(node, value) {
    if (node.textContent !== value) node.textContent = value;
  }

  function setHidden(node, hidden) {
    if (node.hidden !== hidden) node.hidden = hidden;
  }

  function formatRemaining(value) {
    if (!Number.isFinite(value)) return '—';
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
  }

  function formatCountdown(resetAt, now = Date.now()) {
    if (!Number.isFinite(resetAt)) return '↻ —';
    let seconds = Math.max(0, Math.ceil((resetAt - now) / 1000));
    if (seconds <= 30) return '↻ now';
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    if (days > 0) return `↻ ${days}d ${hours}h`;
    if (hours > 0) return `↻ ${hours}h ${minutes}m`;
    return `↻ ${Math.max(1, minutes)}m`;
  }

  function resetTitle(resetAt) {
    return Number.isFinite(resetAt)
      ? `Resets ${new Date(resetAt).toLocaleString()}`
      : 'Reset time unavailable';
  }

  function renderLimit(uiLimit, usageWindow, now) {
    setText(uiLimit.remaining, formatRemaining(usageWindow?.remaining));
    setText(uiLimit.reset, formatCountdown(usageWindow?.resetAt, now));
    const title = resetTitle(usageWindow?.resetAt);
    if (uiLimit.root.title !== title) uiLimit.root.title = title;
  }

  function render() {
    const ui = state.ui;
    if (!ui?.row.isConnected) return;

    if (!state.usage) {
      setHidden(ui.values, true);
      setHidden(ui.status, false);
      if (state.isFetching) {
        if (!ui.status.querySelector('.clm-spinner')) {
          const spinner = document.createElement('span');
          spinner.className = 'clm-spinner';
          ui.status.replaceChildren(spinner);
        }
      } else {
        setText(ui.status, state.error ? 'Unavailable' : '…');
      }
      return;
    }

    setHidden(ui.status, true);
    setHidden(ui.values, false);
    const now = Date.now();
    renderLimit(ui.five, state.usage.five, now);
    renderLimit(ui.week, state.usage.week, now);

    ui.row.title = state.error
      ? 'Last refresh failed; showing the last known values. Click to retry.'
      : `Last updated ${new Date(state.lastSuccessAt).toLocaleTimeString()}; click to refresh.`;

    const fiveText = formatRemaining(state.usage.five?.remaining);
    const weekText = formatRemaining(state.usage.week?.remaining);
    const ariaLabel = `5-hour ${fiveText} remaining; weekly ${weekText} remaining; click to refresh`;
    if (ui.row.getAttribute('aria-label') !== ariaLabel) ui.row.setAttribute('aria-label', ariaLabel);
  }

  function scheduleCollapsedSync() {
    cancelAnimationFrame(state.resizeFrame);
    state.resizeFrame = requestAnimationFrame(syncCollapsed);
  }

  function syncCollapsed() {
    const { ui, source, mode } = state;
    if (!ui?.row.isConnected || !source?.isConnected) return;

    let collapsed;
    if (mode === 'exporter') {
      collapsed = source.classList.contains('ce-nav-trigger-collapsed');
      ui.row.classList.toggle('ce-nav-trigger-collapsed', collapsed);
    } else {
      const sidebar = ui.row.closest('nav, aside, [aria-label="Sidebar"], [data-testid="sidebar"]');
      const parentWidth = ui.row.parentElement?.getBoundingClientRect().width || 0;
      const sidebarWidth = sidebar?.getBoundingClientRect().width || parentWidth;
      collapsed = (parentWidth > 0 && parentWidth < 96) ||
        (sidebarWidth > 0 && sidebarWidth < 96);
    }
    ui.row.classList.toggle('clm-collapsed', collapsed);
  }

  function bindSourceObservers(target) {
    if (state.source === target.source && state.anchor === target.anchor) return;
    sourceObserver?.disconnect();
    resizeObserver?.disconnect();
    state.source = target.source;
    state.anchor = target.anchor;

    sourceObserver = new MutationObserver(scheduleCollapsedSync);
    sourceObserver.observe(target.source, { attributes: true, attributeFilter: ['class', 'style'] });

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleCollapsedSync);
      const sidebar = state.ui?.row.closest('nav, aside, [aria-label="Sidebar"], [data-testid="sidebar"]');
      for (const element of [target.source, target.anchor.parentElement, sidebar]) {
        if (element) resizeObserver.observe(element);
      }
    }
  }

  function mount() {
    if (state.destroyed) return null;
    addStyles();
    const target = getMountTarget();
    if (!target) return state.ui?.row.isConnected ? state.ui.row : null;

    const sourceChanged = state.source !== target.source;
    if (!state.ui?.row.isConnected) {
      state.ui = createUi(target);
      state.mode = target.mode;
    } else if (state.mode !== target.mode || sourceChanged) {
      applySourceAppearance(state.ui.row, target.source, target.mode);
      state.mode = target.mode;
    }

    const { row } = state.ui;
    const parent = target.anchor.parentElement;
    if (parent && (row.parentElement !== parent || row.nextSibling !== target.anchor)) {
      parent.insertBefore(row, target.anchor);
    }

    bindSourceObservers(target);
    syncCollapsed();
    render();
    return row;
  }

  function deepFindToken(value, seen = new Set()) {
    if (!value || typeof value !== 'object' || seen.has(value)) return null;
    seen.add(value);
    for (const [key, item] of Object.entries(value)) {
      if (typeof item === 'string' &&
          /access.*token|token.*access/i.test(key) &&
          item.split('.').length === 3) return item;
      if (item && typeof item === 'object') {
        const found = deepFindToken(item, seen);
        if (found) return found;
      }
    }
    return null;
  }

  function tokenExpiry(token) {
    try {
      const payload = token.split('.')[1].replaceAll('-', '+').replaceAll('_', '/');
      const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, '=');
      const exp = JSON.parse(atob(padded)).exp;
      return Number.isFinite(exp) ? exp * 1000 : 0;
    } catch {
      return 0;
    }
  }

  async function getAccessToken(signal) {
    if (state.token && Date.now() < state.tokenExpiresAt - 60_000) return state.token;
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
        cache: 'no-store',
        signal,
      });
      if (!response.ok) return null;
      const token = deepFindToken(await response.json());
      if (!token) return null;
      state.token = token;
      state.tokenExpiresAt = tokenExpiry(token) || Date.now() + CONFIG.TOKEN_FALLBACK_TTL_MS;
      return token;
    } catch (error) {
      if (error.name !== 'AbortError') console.debug('[Usage Limits Mini] Session lookup failed', error);
      return null;
    }
  }

  function allObjects(value, out = [], seen = new Set()) {
    if (!value || typeof value !== 'object' || seen.has(value)) return out;
    seen.add(value);
    out.push(value);
    for (const item of Object.values(value)) allObjects(item, out, seen);
    return out;
  }

  function firstFinite(values) {
    for (const value of values) {
      if (value == null || value === '') continue;
      const number = Number(value);
      if (Number.isFinite(number)) return number;
    }
    return null;
  }

  function windowSeconds(object) {
    return firstFinite([
      object.limit_window_seconds,
      object.window_seconds,
      object.window?.seconds,
      object.limit_window?.seconds,
    ]);
  }

  function usedPercent(object) {
    return firstFinite([
      object.used_percent,
      object.utilization_percent,
      object.usage_percent,
      object.percent_used,
    ]);
  }

  function resetAt(object, now) {
    const raw = object.reset_at ?? object.resetAt ?? object.resets_at ??
      object.window?.reset_at ?? object.limit_window?.reset_at;
    if (raw != null && raw !== '') {
      if (typeof raw === 'number' || /^\d+(\.\d+)?$/.test(String(raw))) {
        let timestamp = Number(raw);
        if (Number.isFinite(timestamp)) {
          if (timestamp > 1e14) timestamp /= 1000;
          else if (timestamp < 1e12) timestamp *= 1000;
          return timestamp;
        }
      }
      const parsed = Date.parse(raw);
      if (Number.isFinite(parsed)) return parsed;
    }

    const after = firstFinite([
      object.reset_after_seconds,
      object.resetAfterSeconds,
      object.window?.reset_after_seconds,
    ]);
    return after != null && after >= 0 ? now + after * 1000 : null;
  }

  function findWindow(payload, targetSeconds, now) {
    let best = null;
    let bestDistance = Infinity;
    for (const object of allObjects(payload)) {
      const seconds = windowSeconds(object);
      const used = usedPercent(object);
      if (seconds == null || used == null) continue;
      const distance = Math.abs(seconds - targetSeconds);
      const tolerance = Math.max(120, targetSeconds * 0.03);
      if (distance < bestDistance && distance <= tolerance) {
        bestDistance = distance;
        best = {
          remaining: Math.max(0, Math.min(100, 100 - used)),
          resetAt: resetAt(object, now),
        };
      }
    }
    return best;
  }

  function parseUsage(payload, now = Date.now()) {
    return {
      five: findWindow(payload, CONFIG.FIVE_HOURS_SECONDS, now),
      week: findWindow(payload, CONFIG.WEEK_SECONDS, now),
    };
  }

  async function requestUsage(signal) {
    const send = token => {
      const headers = { accept: 'application/json' };
      if (token) headers.authorization = `Bearer ${token}`;
      return fetch(CONFIG.USAGE_PATH, {
        credentials: 'include',
        cache: 'no-store',
        headers,
        signal,
      });
    };

    let token = await getAccessToken(signal);
    let response = await send(token);
    if (response.status === 401 && token && !signal.aborted) {
      state.token = null;
      state.tokenExpiresAt = 0;
      token = await getAccessToken(signal);
      response = await send(token);
    }
    return response;
  }

  async function fetchUsage(force = false) {
    if (state.destroyed) return;
    if (state.isFetching) {
      if (force) state.refreshQueued = true;
      return;
    }

    const now = Date.now();
    if (!force && now - state.lastAttemptAt < CONFIG.REFRESH_MS) return;
    state.lastAttemptAt = now;
    state.isFetching = true;
    state.error = null;
    render();

    const controller = new AbortController();
    state.abortController = controller;
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT_MS);

    try {
      const response = await requestUsage(controller.signal);
      if (!response.ok) throw new Error(`usage ${response.status}`);

      const parsed = parseUsage(await response.json());
      if (!parsed.five && !parsed.week) throw new Error('rate-limit windows not found');
      state.usage = parsed;
      state.lastSuccessAt = Date.now();
    } catch (error) {
      state.error = error;
      if (error.name !== 'AbortError') console.warn('[Usage Limits Mini]', error);
    } finally {
      clearTimeout(timeoutId);
      if (state.abortController === controller) state.abortController = null;
      state.isFetching = false;
      render();
      if (state.refreshQueued && !state.destroyed) {
        state.refreshQueued = false;
        queueMicrotask(() => fetchUsage(true));
      }
    }
  }

  function isExternalCandidate(element) {
    return element instanceof Element && !isOwnElement(element) && element.matches(MOUNT_SELECTOR);
  }

  function subtreeHasExternalCandidate(node) {
    if (!(node instanceof Element) || node.id === ROW_ID) return false;
    if (isExternalCandidate(node)) return true;
    return [...node.querySelectorAll(MOUNT_SELECTOR)].some(isExternalCandidate);
  }

  function mutationAffectsMount(mutation) {
    for (const node of [...mutation.addedNodes, ...mutation.removedNodes]) {
      if (subtreeHasExternalCandidate(node)) return true;
      if (node instanceof Element && state.anchor &&
          (node === state.anchor || node.contains(state.anchor))) return true;
      if (node instanceof Element && state.ui?.row &&
          (node === state.ui.row || node.contains(state.ui.row))) return true;
    }
    return false;
  }

  function scheduleReconcile() {
    clearTimeout(state.reconcileTimer);
    state.reconcileTimer = setTimeout(reconcile, 200);
  }

  function reconcile() {
    const row = mount();
    if (row) fetchUsage(false);
  }

  function addInterval(callback, delay) {
    const id = setInterval(callback, delay);
    state.intervals.add(id);
  }

  function destroy() {
    if (state.destroyed) return;
    state.destroyed = true;
    domObserver?.disconnect();
    sourceObserver?.disconnect();
    resizeObserver?.disconnect();
    state.abortController?.abort();
    clearTimeout(state.reconcileTimer);
    cancelAnimationFrame(state.resizeFrame);
    for (const id of state.intervals) clearInterval(id);
    window.removeEventListener('resize', scheduleCollapsedSync);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    state.ui?.row.remove();
    document.getElementById(STYLE_ID)?.remove();
    if (window[RUNTIME_KEY]?.destroy === destroy) delete window[RUNTIME_KEY];
  }

  function handleVisibilityChange() {
    if (!document.hidden) {
      reconcile();
      fetchUsage(false);
    }
  }

  domObserver = new MutationObserver(mutations => {
    if (mutations.some(mutationAffectsMount)) scheduleReconcile();
  });
  domObserver.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('resize', scheduleCollapsedSync, { passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);
  addInterval(reconcile, CONFIG.HEALTH_CHECK_MS);
  addInterval(() => fetchUsage(false), CONFIG.REFRESH_MS);
  addInterval(render, CONFIG.COUNTDOWN_MS);

  window[RUNTIME_KEY] = Object.freeze({ version: '0.12.1', destroy });
  reconcile();
})();
