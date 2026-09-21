// ==UserScript==
// @name         ChatGPT Codex Limits Mini
// @namespace    alirezadigi.chatgpt.codex-limits
// @version      0.13.1
// @description  Shows the remaining 5-hour and weekly limits in the ChatGPT sidebar.
// @license      MIT
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAABBvklEQVR42u29edydVXUvvtbe+xnO+I6ZExKSEAhgGEQmAwiixQEFZ22drpZe22tttdfWtg6tVYut1Upbr7WltSrOFLQqiDIqM8iMyBQgc/LOZ3iGvdf6/fFM+3nOeZPY9t7+7v1wPiEkb8573nP22nut7/qu71ob4NnHs49nH88+nn08+3j28V/ywP/NL48oJUqJUqAQICUiAiIgYv679eDkPwRM/px+lZOXSv9wyD+68jkZGBk4eVf2D2UCBmYGZiBiYiYDhpgMG2Jj/m8yACola77wPeF5wnVRKVQShUgWHQA4XURETNeUkzeBmP4jc/KPyTO5eJeZUXIzYPYv2WsyAnDx5fR3htSkwGh9XgYAZiGw+DG2yXNjGMNxTFFEQWiCwAQhEP3/zgDCddVIW7WawvdQKUBkYgBi5vSzJcs8sIXZWiW0/po/kysrWf7XymHLnlw+P4WBi7MADAxcOgrpj8fkW9MTAwiIKNLDykQca9Pr6YWOnl/4Tzkc/1EDqHbLnRiXjTpIyURMVKxO/tGxuuKLuxJGwGRxrLVOl7T09fQ0FJ+gWOXkdy5/RMRh1iysX/nn5IelbyaxLnPqNoVAFBxFeqETTU2ZfvBfYwDVanrLl4laDZiYiImT7ZK88XyfDnp5LC1h+eBXzwUXBmNr0Uura/0ZLfeP5R9XehtYWmmA/DAwl57IXJwSts9J8nUpgdnMd4I9eygI/88ZAB3HX7lCjbbZEBmdxFO292+yGyufxl4jHuZHEs9b2vTZs7gcpC0zJqEi2/5Y8mgDMblsjCFHEbEURMrHLfspuXskAgChFAJE+6eD3Xt+OZjw7zOA0257q1eCkhzr5JCmewdtJ1+CMolfLX14Zq5CH8sw9sdg+0W5tFAWPqogn9RdZF/h0qImjt3yPzyAnRAQMDl+iVmT/5jZPg4pcGIGQOm61A96z2yn4JfzSPKXera/fJm/ZhURgTEZlEzPc/55869lwCf5ylCHz4N/Hbb6iUm4vGN4cPtWvmL/WAR79bG6tTNwXPwUzOyEYrgbS18rDSCkY3SUOz5GUURh+L/FALXVq9ylkyYMAQBRlPAHVt9guuuzrcdZoKtEUmAuHAZnMJTt05DbKfFMGRK1IRFnbi+1WfarsvqI1UOf728rfli2Q/vfF9s++VOBDDN442NsjOn3/5MNUDtstTMxboJgWA6FNu7AMm4v3E9+eq3QijnaZwvjp0/hkg04e1pxGrj4epERMDBj8QSwn5AGKh48gmwZCfPPgAPhgBmw8q1oHT5mNuSOjrHRh2iDQzKAt2K5MzlOYZi8v3R3p2c2SX4wxW1lzFCNcpzj78zVMFgLzdbO5Sw7zT8uF66IAYvjwkXqYJkmW33LAtZyZybBAV9l/T3LCQALA6V/KwAbZwc7y/iYyWh3dNSE4aH4ooMbwB0f91YsM2GAKBgHcqJyQM+WP3U2yFZUZit4JauW7eVs6S0caq8gcxU0cTl6py6onNLmx4ItTMyD0cGO4aVvLkJK+rG59LK5U4QC90GK/pjJOKMjZqHDWv+HDCB8v7Z2Dek4Qcr5Vih7VR6OpuxtUoqxJW+TmoAY83QofQ4mphp8tcS09jHj/LAUyMTO5qC8S2EgFeGSWdj6rgoKLl4Wy0C2eHuYQFUhVLMZz8z+hwxQW7sGHQWGUGSpeglbWGEthYTZ2y4jHGbOE9yUsuE8HDOy9cHYhndWEpBTQ8yWK7CcTPoiiW2s7yq5qeJ4Fqk0QyUS8ABCR2vJ0xfJ/ROXzn6xMsYIzxNC6E7332kAd2LcmRinKMowD5ayWCzlMswF3sdS4pgsihUzwYY3bEVgYOLiuAz49CHZW4VIKwVkZC7F2yx3yF+My04s94qWByudPx5KolT9FhbLwUarZvPAjmhRA6AQtcNWA9kM8WBuaAFsHGTNCo9v7UcLbtoLUX6CHbGBB6NottZYDq3Z8cNynM25Hi4YitTXoQ2WoIgl5UiTckElBzawHimAYijxUYiolJ5f+KUN4E5MqJEWa52/Vil7LDFriBbktMiDAqjYrtpeegvmWwZIopu1XWEw60XLRGxF10HwlSWGbMGDwXiVOX22PtwAYLWcFw4ho+yIwKlLIJKeR93eYodgUQN4K5cndM6iRQ4uAlwBjZlLCRYXqD5zQRbgsRFO4buZS1GUUSAKBAA2xGFMYUxhzLFO2GAUAgRWonpplRlzUtPa9TA0o85Y6BKcwuGlniL7KYApD0R4ZpBSoNCdznBOc7hZmk3heaRjLKjgwdqUDUts6szetlBZTbaTqczPlrw7W6FCCiDWnb7pR0IJZ7TlLB11RhroKQpiM9+PZubj2Q6FsfAcWfdBIZjEvJhvFiyF8gEMzYBWIYKt6J6l8MjCWoWCUMo9EgOgZWGL/Er+xWjZrKOUQ+sHajGWv5rLs+VBOal+YO4xbI6zcAsZXWWntRXblJFMETBQCjakp+aEq1rHrp94wfEjpx5T23SYmmyLmsOIpMkEYTA9F2zbtXDHw7PX39e96xc0E8iRBirJhhAxwYOAyJiTDpzg9CqfmiWXRXaOmHmghOJFAACRQbjEMJibjUsUZClbYCYGR8lGQ8/PHxobitjYuB6kZKbS4a2WP8qMDQzwxszWCRiMulleUCAQYCZAQBTxbEf6zopXnLH67S9tnXKM8OvERlOkY03GEDMDECIrBEeiEHEQdO95bOor18x+7Uaa78rRZhoz09QcLaSIWVRIuc1qvQwsQjQlhLICapE7F/xXhb1GtPKFbBmEUrTQCXbuOiQDiJpfO3wta51hCK7UpkocGmYLV7ZBsvYwwPNU7UElj48SKdJ6vrv8Zc/f9MdvHX3uFsMmjHo6jgmAAQg5LXUyG2YiIjLMzEJg3QVP9e95dM/HLpu/4hbZqqGjgJjRpi3L3EPJJMOr+YAiiUAlsjczhsX6WuQ2VhJ1AIFouPfktsGCgRxa6pKtJhgaTHKxiAelPNZmDtjGEnb6ylXcbVPqzCyU0As94cotn/mdYy7+bX/F0jBYiOOYEFhgEkoJgJiJmZiYgREYkRCJWAeR7vTF8onma7eq5SO9a+/jKEZXAaWODouUK0vnuYy+LChcENM4CLktsm6AeqzW87J/EUqZToe1ObgBnNER4XtAFudbaBgqsKGypqlbtwFl+knTVS745MIezMyESsbT8431K0678i9Xn3dOFCwYHZEQJNJnMKdZGjNQsv0ZmNkwEeX2YBOEphs1tm7xTt7UueoOnu+jq4CpcuhxiDRgoORgr7uFraukth1gAMvfzrm3E1Jxfwg9N8wAE+OoFDNZpRQcTvTkkblY34Lwz5hhYOYkocNKbpUFAZQynpkfPWHT1u//dWvDurA3C0IwIkHiaoDSX0zAhskwGWZiNgTETETMTESGEufEeqYjN6yqPX9z93u3cS9EJasCFyhTdWBLYHiQbhxW2ylOEpZOAA79LiEFRZHp9Q5mAERnchxRIINVjRsmA8mzVi4nAQVHyPmxAOIimltUDzOjELrTax6xeuu/XVJbPhn3uqgUJZV+4GTRCZiACNikrp+J2TAZIkNMTIaIKPu7IWLWcx2xZonctLJ/5S0ohVV1H9jhVmqVvcmyRgaqVsNqKapS1amUfQABQAjQRi90DmIAdJQ7MQFWOcv2ZSVCJueKrbiag1LOF7qIBGnUrXD9HMei5m694lPtDYfFvQ4omXp5AGJgAJM6fTDMhpK9T4ZYG5MEYa0NG0OGwBAZY7Th2BCRmVlQm9YgYnD9faLmJQc0A0Vo4xU7LFUJBqgCvDRFt+BVxRiWd84OR4KaiPTc/EHyAJQSBXIegS2Wniu1wHzpmYfxYiVarYT3U9TECWdr5jsnfu4Dk895TtCbQqWSnZ4G22TLExtmBiZi0oaJDBltDKVeiFkbNiY5Z2SINLHRoImJaMeU95oz+9ffa+5/UrYbicNiY8iY5DCgFEJJlDLJtIEI0AKXaHEQFnmKuTaCkZELbhQX1TkwM0h5cCpCuJ4z2iYiK+fLflVYcS6cCZd4/0HwU6ZI8l9C6NmFpeeefMKn36fDDkjJwARggAnYYOZwgBnIaENSQLNODZc8hzzFgKYfURgxEcWGtCFtKNYcxhxEFMccxtSPODZq1UR8wwN6doG6ASM4rXptcrQ2MaoaPqLQvcDMdajbZwDhOunisu2l0A6/aVkw3d22FoaxOFhYKv5nwoV4br5yzgZPgBhCeRZ6viGb3SrtDhpjsHpuMUJEIMVRv/82BEXMgEiZwzFJAEh+ERGCGBsN9+yb++Gtwc+fon6I7bratMY5bgOPNMy+OY514pU41qANa8OR5lgjkemFplX3nrdpstFe9vLTmkcf3ly1zBtpolBEhnthuHtq7uEn9t5y/+4b7p5/+EkAUKNNQGSiIilIiqgMKPIthgACiFHkyTJWBDAV5SUiohBclpZWz4sz0vZWLjc5dcflYm6BHXNkSZgzmJX9XiBRLKlokpKWEHqus/Ts555x9d+YIESBBsAAGWbNpNloZsNsjGHH0WR2fvabU//rSv30buu0SmfTqtqvvbh24Vbqh9QJ2BDFGmKdmIGCKFroekJuPGrTmudsao8vYZSGYwZNTMwsUKAQApRiBxCC7szu625/9O//dddVt6AQslVnQ7n6JsebgAgCEUUuGwVL8p2rpABKARoABIretqc5jg9ogLFRd8UyjnWl/MTA5fjJQyIwcYW3G8IC5Wyzknr/7In/8MENb3911J8DIXKfo5k0k2GOjWbXieZ7j73hg93r7gYp0XWKTJWYowiIvNOf0/jQm9lVvNDn2IA2FMXRfFfEZs36w44+7bmjSyZjMjqOEv0kI1b1kQSMjEopWUOkHdf85N4/+NvZux9UE2NpZoOisEHy7UIAIKaWgNQYRXjP07TiFAip+k89TWF0oBggG3XVajJRYe1BXsFe/dJmH1YGyG2ACWkIQAzacD9yRpqbP/4uNeqTMYRsAAjYAGWIkwhAIzz2mj/qXnuXaDYAgYmRiqINOgo9Vz+xI77jEefUY9gQ9MJ4rqPnukuXTJx07hlHnnqCW/PCKGQmFAKEyJcywUTJdk5+MZOOg5jikU2b1r35JXEQ7L/ubuEqFFgkmBW8iZauCxBtMRrYCVpa49LzC5XCQNUAqlGTzUZy9MBOA7jM1FdYnQTYJBag0q5n5uScchhzN4BYo6fEZJta/sRZJ2x8+/lxFDNCAvlNCvyBAYzW3G7t/OuvTX/+StGsc6yBLdIlR8WG0Pdo137eM4fHrov2To/UGlvOPHnL2ac3x0ejODSG0gaF5J1iUmqB5Iemf84/ogBAjKM+K7n6pS9yVo/suvJGFBIklvQQVkaQrTSW5F42W5dlTShw0AADQbhgSNja+1yEULvEUgGjedqV80IIIJA6AWgt1y51TtgojlyF4yPgyv7M/MjxxwjhEEeMyJzaIHk5YmJHBdPT+z9/JaBgTbYWo6SQQkRmqPnRjT/zj1t/5FvOX3f0Jq9ej+IQIp2sDOfqHUx7FjLuhy11usUqS0Fsuv2pDe94o6h5P3vbR2WjlsZhW4SWUYhIzIIqVdtMwcB2GoRVtfJgPQCTvczMaT2MC/hTrljZFXM7AOR2koJ7AYSxc9IRtQtPd07cxL5r5ntmpkvzXQ6NU6trSBoKUuCflyzJELbr/Z/cEz+2A2t+wmSUABgiMKOUzES9vqh56979hqPe/+bm6lU6DvpBTwiJmSSSS2lM+oGojAe5kscggBS93tRhb7ow2DP98Hs/oyZGU2gGIqW3RKaOKOrOgJw34uRaXiu/PqgBUiqT0v/nwsGc1bFW35LNDuioUKCZmneOWNl+9yu8s443gGZ6gWa73A0oiFgTMAvPMcCGGQAJOKnsprybMQwieHR7usXBbn7hhCQGQOr3AXHZq87e/CcXTRy7xeh+EHRRCBRogAbr16nDyc4yVRsPsiIoYoqtpej2p9b/7lvn7n5k55evUhMjTMQ5xslS4vQ05hw956gpZ1SRF+lKGXBBg71tWZWVyxHYAqZWpZcT2phpptN+0wvGPvBGbjf1vjnuh2wIhQQhMFHWJwQaJBQncsa1MaZhAIE5iIYANoEoBAUhEI2ceuyRf3bR0heegURBfyYJswkpaMvIi8IV5gGLKFkrgQyc/EBLmVSSNoXU2/Dn/2P/DXfr6QX0nKowm0tWTCI2UJ6uFcK5obBz4ATg8BYGOwBY5AlZwZkSD8mGqNdf8tG3jv+PC6PpTjTT5aRXUhgbAya+MYm6mUOw/oxD+T9AKSiMWYf+xtUbPvz21W94qVRu3F9AQJQyC6h5PoS250JEImIidhS6PjIQEMURa8NCMBanO+/JSRB/3Ot7q1Yc9rtveuy9n1b+KBtKNbAJvV4w8NkBRbtPDW0ee8ADDasJs00ylzkGtgQmJbiZIVImol6w+u/eM/LmF4c7p1kb4SgmBhTpxhJpnQ8Q03SXGCQlJ4BT4qGsxkgUkVKyIer21eTo6ve+fu1vvc5rj5qga6IwYXKAqSIWzKQ0aRxgY9D1hfTCztTCk0+IUIuxZm3NSlFvxeE8EeUh2taSIgAI7EfzS9/yku2fuzzcvkf4HjAxC7TaRFJlTlZsTnTKRf8OAjAObZ9RQwUyYBfgKzJmruZiRVgWaGYWVn36XZNvf2m4YxqkQEoKVggALDKkkTQdCgBIqR6gBAJBwT8zWVoPBhTUC4TvLPnNCw77gzc316zjsBt151AqlCIvFFWFELkzMYSOo7yR+W2Pb/vUl2d+cGuwcz9HsWrWaxtXLX3by1e88wJ2pAn6lDiQjLVO+AUE5CB0JsYmXnf2jo/9EySgoFShTWAIorCKOLmkl8t1tUNRRUCZWmC22icKuJlbhYEZpdD7Z5e86xUr3vPacNcMKIkGABNwlrFXKIrGTyFSNMIMmBUaEzMkcDSHPkJwrz9y3smrLr6oveVojKKoM4NSCSkKB1vaNlwkTEaDlKI+Ekzv337Jpds/+w0zPQco0HVQSd3rL9z984W7Ht79pe+v//KH/Q0rqdMDIfJDkNkAASDmYOT8U3d++uupHokHqwe5WJSzf81qyBVy74AG4EH9JZbE+zyoQEaBptOvH79x7Sd+g+f6QkljUoeQZFUgssREZOJ7TgQbQMDACQdHZJ0uzLe0MdjwVl/yvvbGddHstFBSSCGAKEUrkDGQibQi8/tEiMKpj8ZBb8cXLtvx8S9F23ai44hGPY39CCglKgVSdG9/8Oe/8rsbfvTp+qpJCqK8p5yBBSImqKfbc49e521aEz60TdR9yORHBRGaQpCC+0I7GvBwSZ4YFumsMF/qmrPVtTmwyA6I1uv+9B21kTbGhEImWTijVSXFFAICItQ8aNZYSUOGgFPeLbEBZelY/lOJRc0nhVHYASVJYM4XaSLDbIA1sGHWwAbYEGmjyW8Yv77zuz+++/nvePKii6Nn9oikmVmb9GilfoM41qLViJ/csePdn9bImij5ZZgoLQGRYTaxwVaztmUDRzEkbo/t5jW29y6XVFJDBdcHcEHltomCaBtSigEGRoF6dmHivFOXvnxrNNeRjiJjRMKxIIokCCAyIjNh3UNm88CT5sd3BxNtfcbxxlDieVMkmgFawSUim4CNSGJZwfYmoaTwBAxMBr0aKH/6ljt3fOTSzg9vAylFs8HGDCoSitePtGjUF75/y/S/3TxywVaa6oAQiUsRKaPDQAaAvGMOgwoIzWVdli/CrIBStE3j0MbCA8WA5DxbBbEy91mpxqz+jQsUqhgsbhaKbrIEa+NoK7794eDS75tHnuEgNC87hQCNMQyykO1yqvxJJUOQy8vSk4G2LJNB5lyVYeG5WGstPPr4ro99afayH0Ici0ad+yH3AvDdIbMSqjMNYPZr1zZecTpTbiomAJEgZyLmWK2eBBBpspmH4bxFIBHMFeHXEiDx8FRsuAGwdIC41G9Sleui6QXN52yYOOck0++jVMgG8yooCkZM8c9Ys/+lH/U/9XXQWjTqDIBSEuT+BhgSfUOSKCUBoshJshCd6HsS95ok5wSG0FGyNRLs27v7U1+Y/ty/0nxXNOqMSN2ee+zhHJv4kafR8xLFIwxTiSZYOfjZo/HeaVQOaJ2YWSCaJKwQcWSwVQMp0vdW1F0Yy0UYhkp9ftEGbnWA7T9kNEBBP2RkhxAchEtedKrfGO93plAgmCxRz9lZIhxvhV+/tn/xV9B1oeanuNEQARUe3wJdydiJoqCThmgmIOBChoZEQkjZbulud9clX56++Gt6xx6s+eh71O2561e3f+PljQu3gjEL/3z17N9cQd2eqNdSj1pBhgwgBC/09OyCGB8DbQBRJDxubqIkBUtgdKFDyOWBjBVAhgMNTodoAB7a5Wg3UhdglEDKsTNPADAVtFvUiBq+eWZP9+KvolQgBBgCRwIAGUo0JqnExYK8VnTPTjNxYq00nhMhsGy1NPH0N6+Z/tiXwnsfQ8cR9Rr1+nJ8pPXfX9l663lqok29EJU79vtvbLzk5KkPXtq76T50HXScwZCQbBwyhLFhrREFCSRMg0HSlRb3AyYWVUWX3YOQUd4VkcoiKEgNhf+F0B4zUR9ySfOeU6exdsZaI5vXEoRYnqkkhEAhEEGONLqfuIZnF7BeA20KYoSYkl0lKJcVUaZ9Qy6q4MBMlMggKOGUoVEDz52/6WdTf/Kl4Md3gpSi1aRODxAarz+n/ZsXOBtW83xPz/WEpwDBTC14mw9ffflH57/8w30f/4rZN1schfyHGMKxJjkO9EMAQJEUEiit3BAjQLxnNpkSUCjY81JDCrKrHQKIRVMh/hIuqNSwyFAR+GSsIcXGWzFRXzKqY5OW6tJ9LwANIoCjeL4bXnt3UsK2Z5QYYyjVeaKlFE3rAYLt6UGsjdEJZKz52Gz0H35i5uOX9b52LWgj6jXqh7TQqb/wpNa7L3SP28hBbKbm0ZHoKkaBAlEI7kcsxcS7Lmyfd/KeP7507ts3gFLCc9kYSAX3JI9cbTyH5nroOEIgCIFJBiMw0bxEP3+mOglnoAJvNSYmAWt4586i9YBK8RbKDZ6lrgwEJiPbTfBdIMIs30IUQjAyCkBV84JH9phdM+iqQpeWmDPVsyXNMUnVOc3DKIsO+Sc0cWyYcaId7Zmd+9iXFz53Jc910PfBc9mQd+rm+pvOrZ99AkhF0x1QEpVMN6NIohGiFCiFmV5wVi5d9/WPzH3zuh2///n46T2i5ueO3jtjC/UiCGPJSIkBZDGzycx3o3ufQOWUPC1UJKQFJZfSeulxOfQYgMMAmn0wKu2xUmYMOiYpYRKlJCIJFEpCGGeepywBNwkHRJziVGbKIkyKOrPna6NGWuyo2c9+u/Ppy83Tu9F1RaPOhiDW6KrG21/in/98s2MKdYC+ByLlYnig/A5KmjCGMB57/QvbLzhh54cu3f+F76LjALE8YpU67gjaN4uOMhyhFCAlGEApEADrfvzodv3Ak1hziwLRcA6nUMkVmIitHukDZcKlTvDy74Oi1WSFokhQMlUkFwujgGy2FLM72gTPAbLbOjiBFRm4oQLnJwCUmI1J0T4xuk7n327dc9bvzv3u39HO/aJRByFYm4QB5NhMX/Sp2XdfwrHGiZFUR1psypRkpazUg8SISFMLstVY//cfOPbaz9Y3r2Oj3decxUTUDTiIKIwojCmMKNYUaQpjcGVw9R0020El8/R/oHG2HBLK/4yHUg+oiCTRboHJSSUu8BBKEc92TS8U7ZogSgCaYBTpCRCsyVu33DtidXDXz4WqsaUUZ2ZDxi7mUN43kFZsUq0YB9Hcey4BZmzUgSgFMHY3i+/2vnVtdOuD7fe/0XvJKagNxBqkTGEiE2hiIclRTtOXNU8AGm1QG1ro+GeftPGGz8xddevceMuEsXBUIi4SSqGSYARLAY7Se2eDK34qap5FzFiDqgq8jzmXj9kUjYzdPjQXhCUOAmCYCig3DCoZ7Z8Nd03Xx9ZiFEtEhqStUbBgBZJ17LaardecGdz1c5Ai3ZuIAEBxnO3PwvlnKRkjcfFkJvQ8RODElWHZVyZArV4zu6emf/sz/nmntv7gTe6Ra2hmITlC6LuiVQfmaNdU/6dPxQ8+HT7yjN41Db0QgigOAmditHbYMh3047GW3LBSHr5CLhllR3KsWTMgymXj/ct+bB7ZjmNN0ASlWSVQ7iCyR/PkU0yGtZUvegLsFn62+pR5SGaASurZ+dn7H20evVFwP+FyWaSyPRYkldLz3YmLzl/49g3BnY+IVrOQhknJzKQ1OypNAygZGpFKaG2MCExA1iCZcnt6TvqD4wRX3Rrd8XDjd17TeNO5ylXgOXr3dOdfbwyuviP62eO0b5ZNtWU3hqd7P2VAIaWMpMDxttpyuDrrOLVlPdZ9kBg9tr3/T1dhwwdjixswFzthvuqW58kmiaGlzDyYOFfWa0l7TDZ/r4T9sdoGzICCg9AZG1l5/tkU99N2KqttPqGTZN2vn31C5+o79e79wnVBCo5iZ83SxstOI2IOYs4ov9RHacOeG97zeHDtXeg6yACV8WHVHhbMh6Gh70E/Cn90Z3z3Y2LlROdfrpr740t737xBP7adO720W0ZI2airkZZqN0TNRyGYGBIC1BBEmrbt0dffG9/8IColVk/2/+Lr9OgOrHlpp0n+AbMGvkwzZ4+lFalWLjsPKKTpdg8iTXQnJ+RIO3GyxTDZpH6ecqJJIZ2ykgmbIKyvXnbWHf8iR3zSJinzaqY4aZgA1sxax9iohXv27/6Dv5/7xnWsSbQa3A+8UzaPf/jt7glH0GyHgzgthjCw1jjaWviXq+Y+9A8p2hkYTzFs+mI6YyVJiLgXoJK5EApdp7358PFTjh094ciRI9d6y8dFqyGlZMPQ6UX7Z+Yf3zlz/6NTtz8w98ATemYOlJKeBwAw1uDZLihpgx+0JKHZX7MVT1MHgYVcDphJKCfas7fSJKMWI4J4iFZmSMbBxLLm9554Ztfl1x/+ztcG4RRKmWwJCQgo0hqm45hu4I+PbfzKR+Z+/fydH/zH7k/uA6XCmx/afcEf1V9/dutdF6iVkzTXYU0ICMnM4EJIzDAw4nUYxZ5tTGJAFu0GByEA1NYsX/W6c9e87tzR4470vDYyEhoGAjAAIEAgCACx5PmCEWPqzT/59M7v/nT71384e9fPAVjOYWX1B2FnEYywMlcj4015+LzZQRdUT1xQ1pzA9qwltIO59WeOTf/p3Wve+lJQaI8wyKUCiCiFQCLqh/6mw8Z+7Vxn7dLwwaf09CwwRHc/Enz/NmzWxOa14Cjuh0wMnhPd+3h4wz3oOvaAq6Hqjso4mST1pU7PXTJ+zId//cTP/9Fhr3xJfeVSYqPDno76FEekY0yaarSmKKIo1HE/1n0G8icnlp/2vMPe+iut49b3Htve37YbXQelKCbl2CMK00iQE/AiOQ3FyLlcviiE6fYqLmiYATyP2ZrhU1GoD5bviYXv9p/a4Y6PLt16WhR2QIqUQMt6d0Q2YBEFcj9iQ83Tt7Tf+AIS2P/ZoxAZiEz/B7cEN90n1y53jlrLUcwM8UPbMgPwwESeIaAuBX9SMBEH4aq3vvSUb168+ldeCA7ooGPiCBGl7yuvoZyGcmuoFCgllec4deU00PVACSZNUaTjPgkcP/aYw9/2crWktf/6u00vELVka9ojei3vD4UkFK2vF/XAYQYYGgNGWGurIp+NseYUn2Ty2ywkJE/UWnrq9Bv/qbVlo+7Ns0DDZIANQ1JzNwWlDMSsYw2uhFatd98v9n/8q/PfvD45Z8J1axee6f/quc7xG3v/8L35P7k0iwFD/P7A/DRGKSmIZN3b8nf/c92vvYp1SHHIDNJzpawzxd2nd0zf84uFh7eFO/fGMwsmipXnuu2mt2KyddTasROOaBx+GAjXmB5FcSKwlG5j6p5773rbR7v3PS7HWxAbq4fJmq+ImLUOZEdBFCZhZqFUtHev6fUPHoQp1hXhbToU2v4DMyTyMiYmRoFmodt+7tEnX/3XaqxhgpAFmmS5E/lJ0veSSR9M0voSa2h4xsGF798886eXhXf/Ah2X4whb9cbvvZG73e4nvybqtaI4A4NEsH1+BfVDb8noyVf85fJTTwl704DIUjhuK5yfeeaK63ddft3cvY/G03NJA0QismNiiDWQASHdsdbIlo2rXnvuyte8sD62JIrmjTHMpOqt/vTMnW/4wMw1d8jxNmsDxdDUYhq/pf2wZksmgnhmIVW0r2qAoS7IZcOVAh7yABddGTpCLGp+sG37Qq+34mVnICJrg0mHezEYKVUBJmIIBmCBJoypFzpHr2+94RyxbCy85zHu9AVjdO1d+sGnkvofQElpb9X5LY8kBIWRt2T0tKsuWXLSiVFvBhCFW0NUT331u3f/1ief+Zfv9Z/eg4iq7st6TdY9WfdVzZO+K2qerNeE71KsO49v3/2dG3b86/Xg8MgJx6DrMBkdR7JZX/rqc6Zvu7//8FOi7gNR4WyK1S/6tq1J1hkYFWh6vdT2ixqgVheex8RYYS7KElYsWgizUCyQ+6HauDraunnm/scn1691R1s6jhNkkEsGcmUy5RVlBECkbkCG3NOO9l9xCjJGDzwJsUZAlMKqwg+T5ycQGwUQoSNPu/Kvlp1yUtibBUSn1u5s333nRR99/DNfM72+024KV2FecwAwnb6e7VAi3zMGknqX78pmLZ6Z3/3ta6dvv3/8+ce7S5cYExqthe8te/kZe3/w02jnfuG76SqhsNuYrGCQ9tXk2BmFOLgBRL2GnjvkjgK2x0pBRVCcBppYe792jnvEmt7eqb33PuJ4bmP1MlRSa53O+sxskKi880kpnIrh2Sz0ZL1eO+957pnH6j3T+tEdoA26jj2spUBBUrAxYAilBIHUD479m/evedXLot4MCKFq7X2333Pra98/d88v3IlRISUbKuYpCDS9cPT4Iza85WWo5Pwj26TvFVQYsVBSNOudh7ft+NaP2qccU1+/zuiAjHbaI+2Tj9711avBUCI0hqJPMu+TyUFRCkFycEYHPwH1mnC9ov99qA0GigQgEIJYHrGq9pYXcxTLmh+H8e77HpnfttMfH/GXjjOzjmPOWlCzRK6Q/aYzUBDZGJ7vyxUTtZedqjav0Y/vNDv3QVqfzTgwFCAFdXtipCHbTe4F1A9WvO7c4/78fVF/jhFVrb3/tntufe3v64WeM9Jkbew5AihFvNBb/Yozzrrir5afdeqaXz2vu2vv9G0PypqXquEwZQplo6bnOru/8aPm84+tb1hrdKijsLH2cM3xzA9+Khu1hDKoOKIM9FkDqDMXdAgGqNWE50FFiWUpkLDEWnMuGedu4L/uDOekoyCMGVEoKXy3s29m790/j6cXvKVjanxEG2PimBFTJXrGFadNGalYHQCRghj6sdq81jv/NNGs0ZO7qRegEImWgrXhIGicc9LSj76jc9XtNNuR460TL/u4M9E0Opa1+sITO25/3e+bTqDqNdYGSwcHUKAJomM/+lsTGzd05/cLv+YvGdv2pe9JparT5owRvmt64dQPbpm84Ey1ZAQMxRw2T9o89f2bwx37hefkmhS0htmUDZAN3RNicHicWHSAUIVYqjLVpcSONWHDd047FqXERg3rHjZ8rPne5Kgcaey856GH/te3d33vJ2E3wNFRYiJjOBs8k1FwVDBPDCiQlTTTC0xQ/703ND7yZlQyjbTdnhptLv3Ub67+8SXd236ud+xlpsPf/fqRI46Iuz2WUmu673f+Mtw9LRs1NgaSIGJvHmJU0q05GjQ6DoEhB4WUnIC6cvsdayObtWjH3kd+6y+IkARQbFRzZPl73gBxhGXBDw5TN+R7bOgQebG4OrpgmtDObRGqQlNEiGKxZoncsAIRhOcK38OaJxo+1jzRqLmTozTSeOovLnv0ue+Y+doPueZzq05akzFZAYaSiSeZJIiZmGON7QY7cv7PL1v4n18ABo4i6vXbb3zhup9+dvl7f1U/tX3ui98HAGfZxGG/fqHmHiEIt7XtH66Yuu4uZ7zNmbanNO6Rc41FCpE5ERiBPd0xA24J2RkbNd6e/sHNu/7lB+g1ASGOO0tefZZ/1OGmGyQjA5Hz+z6w2EdsTR9ahIoY1IYyVtJg+24crLQHZvRXrNVhS53RlpBS+K6oeaLmiZov6r6oe1D3RaMmds+ET+9+6o0f2fbi9y785H4ab7GnTByTpQxKgZE2LBDGm+GdP5/71T8LPvNN7vSp13OPWLP+Ox9bd9mHnGWTkQ4Xrr6N98wAwIrXnlNftSru9cFzFvbt3vZ331ateqpdGAIiUuLbmsPCVNL62SMKUgfOhtBzt3/661FvARzJUey0x0dfeQZHQdZEz7Z4sKJuZVtndTADQKGktfQQpZnt1XnJyExq5YSq+8JR6DnZIXBFzcOaJ0Ya6EieXUDHwZrfu+GenS/+vT1v+UTw1G6abBMCxWnizUazJhhvURTPf+if5t72CfPANkABSiz5wK8eccvfts/fSrMd1EZK1fverQwMQqx4/YsIjGECWdv51R8G23ZI3wMGHBxzWgCvBIwlhFxp3iYMXG8ADEAsGn7v/kenr74NnBoxG4hGXnIyKKeEGLkyAiedCrB4AXmYC1rktii2RXaVQfAIIFp1cCQ4UrhKuEq4jvBd9B30Xax5iACRTqYuYb2GUna/cs2eM39n7iNfNP0AxpsEzFEEngOj9d53bpo6/w+Df/5BIrZtvOC4w2/6zKqPv0u6Ds11USr03WjH3uDORwCgeez69kmbo6jHrgqj7r4rbkw6WOxRbjjQz5XgMZOdAAOUF0y4vL3KN3rQ9JU3EQAhGh3Wt2x0167gTM5endJWqA+sjopDOQFY1raVZsAPCdV5ZzELR0olhaPQVcJTwlXoOsJ3pevIyREcaaZzKrQBAKzXoBssfOIr+85+X+efr2ZPwvKRcMfemXf+5fxFn+Lt+wBAjrdWfe59G67+VOu4I2lmHgyjkkgEvtu5/3G9awoARk4/TvhNE8Xg+vMPPNF75ClZ97kigbJKUrmrSXTthklDqkjN5jxCKRjkD8PoeZ3bHw46c+ApjrQzNupvXkthlM6VHQrVD3arz/AGjaHfl7akFZ+nXBpZCISS5Cj7MwsGFoLiWIy3xKaVZttOkCIxABgCKdCp0TN759/92eArP3Ked2Tvq9fx/lkQkplG3/Iry//0v/lrV5m5BWZGJfOqGaKMH3gycd31k44kAGZCULO3PWg6fWdy1BqROjC0tRjmywbYJB4+97CMRVWnIsJhFq4TPrMneHJX8zkbdD9EEO5Ra+DfqOQLsHy7RvkSwEOoCXMxvd8SR2BG5yBkkkHrOidGEPHOKWYWrkqggImyqZuGEirCf9WZ+kc/A6IiNjKAJnAc9NzotoejWx9C5QCAs2n15F9cNPbyrdiP4pk5VBKzk5orteLHdyZV5cbmww3EhAhA3fufyAc75kPIrH6e8rx/RErbPIGSjNpxc9FuPmm/pLaUgua6wVO76s85gpgRwD1saamtMavPVO/agiE32xwgD2AYuLMOoTQR0HJQAMzoOfrxndDpSd8VUkilhCOlo4TroKuE52Ckva1bvLe8iIMQpQQpLDqNgVk06gCAnhr7o19b9ZO/br/0dDO9QLEmJSnrE+eU7xUEJt6xDwBEs+YtGyMwJJA4irbvRSkyqmdgyIKl9EIGYqK0g4pUuyHrrp6eS3idNCGoDHrPUp547wwAJqhZLR2Fxa6mw0ooPUQUxIvlE8Wqw0CkR8/Rz+wzv9ilmjUpBCopHUe6SjgysYSs+xxEjfe9rvbW86jX414AOpsvxcxBRJ1u/ZwTl1xz8fifvUMqh2Y64Khc7p2UEJLBACCQYk1zHQBQzbps1Y3RIFAHoZ6dT+llsAeMFEEMbc2TQAJigSYI/fUrjv/J346/+iw90zHdPipRbUixYih1gxzki5pnB2ociL8wKHE7OAwdDAFoZwHlighmjYxR2L/uHln3pRBKKZWsu6OEo9BT6DnCVYK4/cE3j/zDe50zjoGa4ijmIASJ3pb143/z28u+9/HmCUeaffNIgEpZiCVLStMxi2i04VAnrA4qmbIXWut+WLmJsKAAK7JZQ3FoDCAbQhQUaX/juqO/dfFRV37MP/IwPTXDxoCAMiXD1qxOBnuKKNvDNKwhb/n9PsiHLM7NEgnEourLPHjtHKaDKpJ3QCQct/OtGyZ++0JV80gbg4mg2wgpmAgNCYmJAqV23qm1Fz2PduznvTMCAJaOqiNWeyMtM9sFROEozjo8syknaRKfBjsi4UjhOqmI1JBIpKUIqCSU5wjmqsx8UldaQ4/1ni/+25IXbTW1GoV9kJKiiCCcOP+c0bNP2nnJN7Z/8qvU6YtGLZsgXOB5bNXyMrtOqytph8bAMBRLojXctwzLhG0VUWk6h10MKfOwzIx1P/rF090rblbjbcGglJJKJr9LR0nHUcpRrqM8F7uRjMFdt8rferx71onuUYdLI/TUAgrBQuQ5JNlzQLI5G8aQEYCeB54CAApiHYSMyMTsOaLhM+WInkttHtbJZm3kSGP/N66795Xv6fxiG9THKOlQEEL3OuCo1R/49S23f75+3AbT6WdXCWVD7kDIZWMEyWwJjPZMWyM1BsrTvBjAP3AMyMn7gaJ8yQL21YyAQISOO/Wpb/D+eVXzpEAlpVRSKolCoEr+LqWjZM0TrkJtoBdCpw9BjMnmhdKNa1xO95IRxdD0OYr3XPbDcPsUotCzC+H+ORbSGCMc31k+ybG2rlWzL03JW50ZgIEI6970d26875R3PvmhS6Ig5npbsyEEAxwtTNeP2LT2U+8BgcW1NgCsDbbqzuErCDQLJIBo255BWTkMufFlWFo31ABJ5R2hkgwMmJIHqFMGUffDR5/e+2dfVu0RZJZSJGsulRRSCiVQCSHTNvnEfaNS9jir8l2H6aoZJqMNuIo9OX/zA9s/cdncjQ/gWAuE4DjuPrmDQRARg6gdezhoY8OXgVTAet/EcrQNhnZ+9NIHnvf2fZdfDX4DPY+MZsRYL/CqSVH3IEkpEhcfRu66Zc7aJTqMQCJBFD38NCbjg9C+OaB8IWlletuhuSA4UIZcmbefVULZkGg29n32m9Nfu8adnBTGyGTlpVAqmY8qQGCq3RVCFJW8LPvBrBcrH6tEBAjYroW7p/f8zZX7Lv2+7vbV8lGxaiJ5A907H2EQjECgW6duRs9lQ9YJYijunil/AkTWBoSQ7Vb0xI4nXv2Hj13w/s4vnsL6KPpNUJPzV99Gs/OQy4EQmUx967FOvU1RzK6Kdk1FDzwpPLe4hnhwIAofZHXV4icFh/RXIsLATe+Vq6zQ97b/+iedyZH2uSfH+/crKQ0iplNQkK2EupDtQV7EsK4VT2baN3yK4vkrb5679mcUxnJyBJUEJeXa5cZ3uKu7P7mPOAAlOQrrzz3S3bAyenKX8L3SXW6lGygzeRJl8ldthO8xu7NX3jB/7V1LLnpFc+tzZm9/cPqSy9F1IW9rJQLA+gXPN2CYiJXXu+0hvXOvbLdstWI+F2NAxzRcHT04O9qRvs/Ei/QTDB/Qm2rgEkekJETx3Ldv9I5Z1zzhGBP0gTnxM4gCRDZACgFQcFFLgpKWgAiUwrrXf/DJ/Zde1b3zEVH3RLuOrkLfQ1eJ8ZZ56CmY6cZTc6MXnOmunDC9QLZGw937Otf+TDRrg2XtaqnJlrklYc/zOI47N90z8/Uf939yH6JI7swGQJBIvZ6/dcvSP3k7BCEDsOdPXfzl+J5HRc0vdlDiTjNxSqltABgRda9feWMDRXnHydTRQ947DtzYMSyPZnQUR/Hs136MEutnHy89L5l9hSK7eaZcvcO0m76Y0IVNX8/35r514+y3b6IwlhNt9L2E2kPPRUfieJvne/TwUxxHzvLJ9lmnUtxnBd76VdPfugH6IQphNWpB9R6KocwkMwohPBcdN9FDWtPnkeN48q/fXT96I/UDqPvBM3um3/95JACRK3CFLRBCa9p5LlAxvd5BDIBSSr+W0rm8+FLnW3YoxGJOGqzmr76lf8N97saV3pHrsOaS1qApv3cV7BEK6egyxLrHUvRueXj2i9cEj+4QYy3ZqgvPFa6Dvguug44CVwlPyYm2vvkBjky0fe/YW14say4FobNkCQLNffdm2a5nctrq/bPZomCe67B9rNMKtcXiK0ndXv01Zy750Fup0wUGqLVmPvuN/vd+KpqNtC5fUmJlvxdyyXStTK9bsf2gAYSq1ctoCYfgXLAvAamM6C0a04TvB48+M/uVa4J7H4eRulo9KcfbUHNByaR7FCSCkug50PS46SNR78GnFy6/qXvTA6ikHG2i56LnoO+i76Kr0HXAUcJ1QKBYNWme2cvbduvpOWfF0ubpJ3IUAJn6KUd3bn8ofOhp2aplNmC79zC/qKEAXMVi2VcfY0LAcS+Qa5as/sZHVN1nbdD3wx179//3v0LNyS1m5aXPBukmzdWl/Il1twcHzg3QcdzJyYTOtS9oZh4QYvLAJOPSeO5s5JNAMES9HgrpHXmYf+YW99TNauNKuWRE1DxGpCiOp+fpqT39Wx8Of3gXbVwtj1qDAOg6KAS4DjoSlERHgZIp96AkCBCtOj25q/P+z4NhMdnefPs/+ivHdD8E34t3Tj1+3u9FT+2Vo02ONdpEOxQXoUDaGQvWBTiMxe1OnLSnYc1Z/YNPNrZu0fNdAMT22O7fvHj+c/8qR0fSTpZiYK7IW1TK5y6lLKL9UwczgJTu5CRzpfSSVZsLqhpKq1+aGFrUPZLPwwAokYm5FzJpABCOK9p19F1ApDjmhT71goRyEEvGnLf9Ci4dhUij54IU4CihJEgBUqIjUUlIzAAsJ0d6n708+Nb1ALDkv71y3T/+cdSdQUDRaPQffuKJV30w3rZXTbRYE9PAeM1UBlAqxGe3ozMzgxTU6WGrtuJbHx558elmvsPMODI6992b9l74x6JZKzkfkQEJtO6QswY1ISIYE01PHwQFAbNs1JMZe1WkU7r1G0qUBJQueqpEPURMGEp0lfA8dF1A5CCibkCdAMIYENF3he+B58FCj57YJU48Qi4ZRQTwHHSVUEq4DrgKHYmOEq4SjkRXoUB1zLr4+vtEzJ07HsBlIyOnP4+iPsext3Jp+xWn9e59rH//NuG56Eh7TpN1LwNWJ5pknBJ1e+7mtSuv+GjzjBPNfAcQodnoP7Fj72s/BKFGpaBAz9Y8sME9nS+CMRQEBzMAgPR9FKoAzliaOYHlJhrr3u/KrSn2/ZrWTejJ5xeAUkJydYUURU2VCB2H57p035PiqDViw4oknqPnCE+h6whHYfLLVegoJhaTI86mVf3v3IyOs3DNHbWTj6pvPoKiHsfaGRsdf/05ou5073jE7J9DRwpHWXeuI9p8VpohCogNdbsAMPob56/68h/VDl+jF7oAgPVGODO/+xUfMI/tlM160mxsy9OzCWVDb2hiIQSFIUXRwQ0gXAcdB7JcgCt3zVlv3SoRlHvziovnSqWboosk+R8jlshbQBRAjI7iTs/c+jA4Sm1ZL0YaSQMWKonJIXAlKAVSoOtAbOSRq0FAfMuDQqnZy6/3nrepftSRFPcTVVbrBSePXHAKCoi27dF7ZqgfFo12+fXTyTWhvT6HgWjWWxc8f/kX3jd+0asFggkCAMZWK5qa2/PKP4zveESMtsCQvfqZHrp0p1IFH6KUFASDd6oOMQBKITwfUukv2q9rK/Ir9xqWbyvAQb9k3Yll+bBSq5uAbNAfOgqJzZ2PmPufFGNNefhyGG+h56JEECLtfxMCpABHIkDtpadgTNGtD4PWc9+8Th6+tHHiccwxa01xqJaMj75k69jrt9aO2yjHW8gEkeYw5jDmWCMz1lznsCX1M7aM/eaFSz/5zomLXuWtWEq9DiVcRWus99Bju8//QHz3o3KsjZryexswn0aIOKwOw0UXB6Lpdg+QHlpfUsqdmOBBgXTej7YIss4u0S1fB89WQci62XZx3snSJQjBvQCI5FFr5BnPcZ53pFy3DEfqwndRyrT6qI3ZP6cf3a5/dHf/ylvRdUAbCoLJ975h5Z+8UzYbur8AmhBR1lyUPgNz1KV9c9H+ubjTRwNQU2K0oZaPiVabQZEJqR8AMQjEWp2kmPni96fe+7c81xWtJhgDQkBpRj0O0mRYZj4RBQBHU/sHP/HwRMuZmEAp88vucJFrpBlK19gOvW+cB8bvFmONBsUXXBnNlbWIByEYja4nlo3islEx0U5GBnAn4H2zZucUTc0DMNbqyf3DzEDdbu3Yjcs/+o7G+WdI6UDcgzAG4hRBORKESMk/ZGbDkaE4NsYwALgK/Bqj7N314PSffrH3nZ+Kmo+uUwKd+cZHhGHRz+6oQyk4iuK5uQNTnBZF12rJep3JlCajlNAND4pQC4qtdOMk59OVy7Mt2FZWlGxTmtWb0SiIQMSRTvrXMrZTgBDoOOBKRASTz+BmlJK6fTamceYJE+965dhLTlUj48zMEHEcszZAROlUNGSBICW6CoRLKOKo07/1odkvfK97+Y3cC+VIE4q7WctMAw5ZlvKgUARgVMoszJt+cKgGEI7jjI+nXmiA/qzat6R7ye+jG84C8rAxIgNyu/IkEvtb0LqY1r6udEjvNoNAYDDdHjD569c0X/y85rkn1Y7f4KycELVaMuI1Jb2RKY7ifbPhw0/3bri3e9Vt4T2PchzLZhOUBEqu9bVakUpYG4fMWyqPj0DEaGpqKAG1KK3mTkwkAqnS6JqBO81LV+flT2A+0DQdZq62e/MQR1S+QQ4W4XUWK0AV6WF600DIOgJANdJWqyedlZNyso3NGiBQEJmZjt41rbfv1XtngTQKJRo1EMVokRLPPHgtrkViZEfWqgNLSUGgFxYOWmUpH4JazWm3KZ+TPETusqimdHArDAsMWeNCpesPy3XQwak8nF9lx4MGsMRRULpAFxEkAjHHhqOYja6qeFCi66T8R9IMare+WHfrFX13OCCnquyUlJ4Q8czMIAA9iAGSllVAwcTVEQ08rHmp+sK2l8gvdR3ssCxN/0AY8G9D7ndkayZSqXXdvskXB169UrvFrBDEXIZeNqauxFgrzy8pIDI0ggNllwNvfzjQ5FwAvdBxRkeZTFnSl9XnbM+zqF2tW7ftijtWy8so7JHzQ/riBx1OaUimXXKsXEJtOUYeqI/zUK2flb8PJju8yDtiSx9qeSbW3e4vJc4tHhSGFAToJYVpHOJJhh8qHK7IYIsWxAG3nn9j9X5xLI0OBOvWah64NDbrRMKhPUOVPVvttsdFbgKufmvZBQz8zx6nK5RemIdhGdUhuaDkJ7sTE4CYpO92swEPkaujnRsUX0GsvEErVC82giSHdDh8/jjz4mcOBkdlWw4Qy0uIldXH7MKTopiF+Q2qJdCGw91pumdQSQpDPT9/kAWGgz3Qcdzx8WS4ZhViWRYvyvVD5mhiCZRZZmCGRas9uS3LV1ct/imGx3zGghmu3HpR3ik53165yQjtyzlKl4WXNlY+QjrtSGWieHb2QIDwEA0AAML3ndHRLAOyNYwl4rNY0FKwrCxQ6S5APvge5ooStXRri92jYxO0Q9gOHMRtA5KqRU7VIADhxbU8nN5IG83OgKGDrq08FAOw1mCMrNdLC1yq05cmpmHFLZXH+dhLudgMAhwUMlRFPVbeWfIfWPppNuVcnnEFNhNbTXFsuvCguinbxokwAuK5OTDmUNb2kAxQ2KBWs5Hl4GoDLAZEypHN2u2IBzyJmAuNcdBMxYCMKoop71+s/D1tNUDbCAiVzqvBkzOk1IIlsSZKwcx6bo4PbfUP1QVZpQJXjYwkxZ1FtEaLDhKD0lDfqsdBHEJJDNb7hwg1BiK05YqLrMK68mGx9NDGN1XMU3aYXH0niQJBKoqjeP4gsOffeQLSH2QMhQE6jnCckrij+rawXNKvuB0cQHM4uAyVI8aVP6C99ENqcuXZNrhoKOTBla4Eg/yleMgBy0bLJpNQ9MLCQaPuf8gAqSQ/CIBI+p5IKOuS/0U80FS3DOtX75rjxbzPoDFwyNVcFQA/5AWxbLHqtcCLS6DsqzFwcDS9ECgFG6Pn5wfrvf/5Lqj0nULIRkP4flJzZ6ZCAFC5AgKtxcJqpZmLpkvkYRxTdU5uxRlgFYYWsLYkCyi7Hyw/swpK7eSslFIUOqtkMqbWptejMPz3LyP8Bx9CSL8mfQ+V4mR8WanhHxfXklptoOWTPhxuWE2aQ6NEKUfIkr8kg+Kh4WUxZ8QHgAOQFiOJWMemHwwW2f+PG6DI15RwPeE4qFQq9ORiwu6wDzYw9m0wRWPgkhWHsNGIw4nqAbYJgA9pObhM2FlEDzMZ0jFHMcXRASfY/1cYoATSlUIpUUoUAvMaOoqkksHMA8XrA74XPsjbxAOuLQ6O3LfJzuKC0qwnuDyqkInAGDaateFfBt781xngAIapSAdwWJJs1xcQD2YfPuSPwAN4qlr/KThGZnj28ezj2cezj2cfzz6effw//vj/AK3Gv5zjYKuaAAAAAElFTkSuQmCC
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
      #${ROW_ID} {
        appearance:none;
        box-sizing:border-box;
        width:calc(100% - 0.875rem);
        min-width:0;
        height:auto;
        min-height:58px;
        margin-block:0 0.5rem;
        margin-inline:0.5rem 0.375rem;
        padding:9px 11px;
        border:0;
        border-radius:10px;
        cursor:pointer;
        font:inherit;
        color:var(--text-primary, var(--ce-text-primary, currentColor));
        text-align:inherit;
        transition:background-color 160ms ease, color 160ms ease;
      }
      #${ROW_ID}:hover { background:var(--sidebar-surface-secondary, rgba(127,127,127,.12)); }
      #${ROW_ID}:focus-visible { outline:2px solid var(--interactive-label-primary-default, #10a37f); outline-offset:-2px; }
      #${ROW_ID} .clm-content { display:flex; align-items:center; gap:12px; min-width:0; width:100%; }
      #${ROW_ID} .clm-icon { display:inline-flex; align-items:center; justify-content:center; flex:0 0 auto; width:20px; height:20px; opacity:.9; }
      #${ROW_ID} .clm-icon svg { width:20px; height:20px; }
      #${ROW_ID} .clm-values { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); align-items:start; gap:14px; min-width:0; width:100%; font-variant-numeric:tabular-nums; }
      #${ROW_ID} .clm-limit { display:flex; flex-direction:column; align-items:stretch; min-width:0; line-height:1.15; white-space:nowrap; --clm-accent:#10a37f; }
      #${ROW_ID} .clm-limit[data-tone="low"] { --clm-accent:#d97706; }
      #${ROW_ID} .clm-limit[data-tone="critical"] { --clm-accent:#dc2626; }
      #${ROW_ID} .clm-main { display:flex; align-items:baseline; justify-content:space-between; gap:6px; min-width:0; font-size:13px; }
      #${ROW_ID} .clm-label { overflow:hidden; text-overflow:ellipsis; opacity:.82; font-weight:500; }
      #${ROW_ID} .clm-remaining { flex:0 0 auto; opacity:1; font-size:13.5px; font-weight:750; letter-spacing:-.01em; color:var(--text-primary, currentColor); }
      #${ROW_ID} .clm-progress { display:block; position:relative; overflow:hidden; width:100%; height:4px; margin-top:6px; border-radius:999px; background:rgba(127,127,127,.2); }
      #${ROW_ID} .clm-progress-fill { display:block; width:0; height:100%; border-radius:inherit; background:var(--clm-accent); transition:width 280ms ease, background-color 180ms ease; }
      #${ROW_ID} .clm-reset { margin-top:5px; overflow:hidden; text-overflow:ellipsis; font-size:10.5px; line-height:1.15; opacity:.58; font-weight:400; }
      #${ROW_ID} .clm-status { display:flex; align-items:center; min-height:28px; font-size:12px; opacity:.68; }
      #${ROW_ID}.clm-collapsed .clm-values,
      #${ROW_ID}.clm-collapsed .clm-status { display:none !important; }
      #${ROW_ID}.clm-collapsed { width:32px; min-width:32px; height:32px; min-height:32px; margin:0 auto .5rem; padding:0; justify-content:center; border-radius:8px; }
      #${ROW_ID}.clm-collapsed .clm-content { justify-content:center; gap:0; }
      #${ROW_ID}.clm-collapsed .clm-icon,
      #${ROW_ID}.clm-collapsed .clm-icon svg { width:18px; height:18px; }
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

    const progress = document.createElement('span');
    progress.className = 'clm-progress';
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', `${label} remaining`);
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');

    const progressFill = document.createElement('span');
    progressFill.className = 'clm-progress-fill';
    progress.append(progressFill);

    main.append(labelNode, remaining);
    root.append(main, progress, reset);
    return { root, remaining, reset, progress, progressFill };
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

  function progressTone(value) {
    if (!Number.isFinite(value)) return 'unknown';
    if (value <= 20) return 'critical';
    if (value <= 50) return 'low';
    return 'healthy';
  }

  function renderLimit(uiLimit, usageWindow, now) {
    const remaining = usageWindow?.remaining;
    setText(uiLimit.remaining, formatRemaining(remaining));
    setText(uiLimit.reset, formatCountdown(usageWindow?.resetAt, now));
    uiLimit.root.dataset.tone = progressTone(remaining);
    const progressValue = Number.isFinite(remaining)
      ? Math.max(0, Math.min(100, remaining))
      : 0;
    const progressWidth = `${progressValue}%`;
    if (uiLimit.progressFill.style.width !== progressWidth) {
      uiLimit.progressFill.style.width = progressWidth;
    }
    if (Number.isFinite(remaining)) {
      uiLimit.progress.setAttribute('aria-valuenow', String(progressValue));
    } else {
      uiLimit.progress.removeAttribute('aria-valuenow');
    }
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

  window[RUNTIME_KEY] = Object.freeze({ version: '0.13.1', destroy });
  reconcile();
})();
